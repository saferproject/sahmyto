#!/usr/bin/env bash
set -Eeuo pipefail

if (( $# < 2 || $# > 3 )); then
  echo "Usage: $0 <image> <tag> [host-port]" >&2
  exit 64
fi

app_image=$1
app_image_tag=$2
app_port=${3:-80}

if [[ ! $app_image =~ ^ghcr\.io/[a-z0-9._/-]+$ ]]; then
  echo "Invalid GHCR image name: $app_image" >&2
  exit 64
fi

if [[ ! $app_image_tag =~ ^[a-f0-9]{40}$ ]]; then
  echo "The image tag must be a full Git commit SHA." >&2
  exit 64
fi

if [[ ! $app_port =~ ^[0-9]+$ ]] || (( app_port < 1 || app_port > 65535 )); then
  echo "Invalid host port: $app_port" >&2
  exit 64
fi

script_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
compose_file="$script_dir/docker-compose.production.yml"
state_file="$script_dir/.active-color"

export APP_IMAGE="$app_image"
export APP_IMAGE_TAG="$app_image_tag"
export APP_PORT="$app_port"

compose=(docker compose --project-name sahmito --file "$compose_file")

remove_legacy_container() {
  local container_name=$1
  local expected_service=$2
  local container_id
  local compose_project
  local compose_service

  container_id=$(docker container ls --all --quiet --filter "name=^/${container_name}$")
  [[ -n $container_id ]] || return 0

  compose_project=$(docker inspect --format '{{ index .Config.Labels "com.docker.compose.project" }}' "$container_id" 2>/dev/null || true)
  compose_service=$(docker inspect --format '{{ index .Config.Labels "com.docker.compose.service" }}' "$container_id" 2>/dev/null || true)

  if [[ $compose_project != "sahmito" || $compose_service != "$expected_service" ]]; then
    echo "Removing legacy container $container_name from a previous deployment..."
    docker rm --force "$container_id"
  fi
}

container_is_running() {
  local container_name=$1
  [[ $(docker inspect --format '{{.State.Running}}' "$container_name" 2>/dev/null || true) == "true" ]]
}

wait_for_healthy() {
  local container_name=$1

  for _ in {1..36}; do
    local status
    status=$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$container_name" 2>/dev/null || true)

    if [[ $status == "healthy" ]]; then
      return 0
    fi

    if [[ $status == "exited" || $status == "dead" ]]; then
      break
    fi

    sleep 5
  done

  echo "Container $container_name did not become healthy." >&2
  docker logs --tail 100 "$container_name" >&2 || true
  return 1
}

current_color="none"
if [[ -f $state_file ]]; then
  saved_color=$(<"$state_file")
  if [[ $saved_color == "blue" || $saved_color == "green" ]] && container_is_running "sahmito-app-$saved_color"; then
    current_color=$saved_color
  fi
fi

if [[ $current_color == "none" ]]; then
  if container_is_running "sahmito-app-blue"; then
    current_color="blue"
  elif container_is_running "sahmito-app-green"; then
    current_color="green"
  fi
fi

if [[ $current_color == "blue" ]]; then
  next_color="green"
else
  next_color="blue"
fi

next_service="app-$next_color"
next_container="sahmito-app-$next_color"
deployment_complete=false

# Fixed container names may already exist from the old root Compose project.
# Only remove the inactive app slot here; keep the currently serving app alive.
remove_legacy_container "$next_container" "$next_service"

cleanup_failed_deployment() {
  if [[ $deployment_complete == "false" ]]; then
    echo "Deployment failed; removing the unhealthy standby container." >&2
    "${compose[@]}" stop "$next_service" >/dev/null 2>&1 || true
    "${compose[@]}" rm --force "$next_service" >/dev/null 2>&1 || true
  fi
}
trap cleanup_failed_deployment EXIT

echo "Pulling $APP_IMAGE:$APP_IMAGE_TAG..."
"${compose[@]}" pull "$next_service"

echo "Starting the $next_color application container..."
"${compose[@]}" up --detach --no-deps --force-recreate "$next_service"
wait_for_healthy "$next_container"

cp "$script_dir/nginx/default.$next_color.conf" "$script_dir/nginx/active.conf"

echo "Starting or updating the reverse proxy..."
remove_legacy_container "sahmito-proxy" "proxy"
"${compose[@]}" up --detach --no-deps proxy
wait_for_healthy "sahmito-proxy"

docker exec sahmito-proxy sh -c \
  "cp /etc/nginx/templates/default.$next_color.conf /etc/nginx/conf.d/default.conf && nginx -t && nginx -s reload"

printf '%s\n' "$next_color" >"$state_file"

if [[ $current_color != "none" ]]; then
  echo "Stopping the previous $current_color application container..."
  "${compose[@]}" stop "app-$current_color"
fi

deployment_complete=true
echo "Deployment complete. Active color: $next_color; image tag: $APP_IMAGE_TAG"
