$ErrorActionPreference = "Stop"

$projectName = "sahmito"
$proxyName = "sahmito-proxy"
$blueName = "sahmito-app-blue"
$greenName = "sahmito-app-green"
$blueConfig = "deploy/nginx/default.blue.conf"
$greenConfig = "deploy/nginx/default.green.conf"

function Get-RunningColor {
    $blueRunning = docker inspect -f "{{.State.Running}}" $blueName 2>$null
    $greenRunning = docker inspect -f "{{.State.Running}}" $greenName 2>$null

    if ($blueRunning -eq "true") { return "blue" }
    if ($greenRunning -eq "true") { return "green" }
    return "none"
}

function Wait-ForHealthyContainer {
    param([string]$ContainerName)

    for ($i = 0; $i -lt 24; $i++) {
        $status = docker inspect -f "{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}" $ContainerName 2>$null
        if ($status -eq "healthy") {
            return
        }

        Start-Sleep -Seconds 5
    }

    throw "Container '$ContainerName' did not become healthy in time."
}

function Ensure-Proxy {
    if (-not (docker ps -aq -f "name=^${proxyName}$")) {
        docker compose up -d proxy
    }
}

$currentColor = Get-RunningColor
$nextColor = if ($currentColor -eq "blue") { "green" } else { "blue" }
$nextContainer = if ($nextColor -eq "blue") { $blueName } else { $greenName }
$currentContainer = if ($currentColor -eq "blue") { $blueName } elseif ($currentColor -eq "green") { $greenName } else { $null }
$nextConfig = if ($nextColor -eq "blue") { $blueConfig } else { $greenConfig }

Write-Host "Building fresh image..."
docker compose build --pull

Write-Host "Starting $nextColor environment..."
if ($nextColor -eq "green") {
    docker compose --profile standby up -d app-green
} else {
    docker compose up -d app-blue
}

Wait-ForHealthyContainer -ContainerName $nextContainer

Write-Host "Ensuring proxy is available..."
Ensure-Proxy

Write-Host "Switching proxy to $nextColor..."
docker exec $proxyName sh -c "cp /etc/nginx/templates/$(Split-Path $nextConfig -Leaf) /etc/nginx/conf.d/default.conf && nginx -s reload"

if ($currentContainer) {
    Write-Host "Stopping previous environment..."
    docker stop $currentContainer | Out-Null
}

Write-Host "Deployment finished. Active color: $nextColor"
