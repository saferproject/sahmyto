# VPS deployment

Pushes to `master` run CI first. When deployment is enabled, GitHub Actions then:

1. builds the application image with the production `NEXT_PUBLIC_*` values;
2. publishes immutable `<commit-sha>` and moving `latest` tags to GitHub Container Registry (GHCR);
3. uploads only the Compose, nginx, and deployment files over SSH;
4. starts the inactive blue/green container and waits for `/api/health`;
5. reloads nginx toward the healthy container and stops the previous one.

If the new container does not become healthy, the script removes it and leaves the active container and nginx configuration unchanged. The workflow is disabled until `DEPLOY_ENABLED` is explicitly set to `true`.

## VPS prerequisites

The VPS must be a Linux host with:

- Docker Engine and the Docker Compose plugin installed;
- an SSH user authenticated with a dedicated Ed25519 key;
- that user allowed to run Docker without an interactive password prompt;
- inbound TCP port `80` open, or the custom `APP_PORT` you configure;
- at least enough free disk and memory to run two application containers briefly during a deployment.

Install Docker from the official Docker Engine instructions for the VPS distribution. Do not use an untrusted convenience script. Confirm the deployment user can run:

```bash
docker version
docker compose version
```

The workflow creates `~/sahmito` on the VPS. No Git checkout, Bun installation, Node installation, or `.env.production` file is required there.

## SSH credentials

Create a key dedicated to this deployment on a trusted machine:

```bash
ssh-keygen -t ed25519 -a 100 -f sahmito-deploy -C sahmito-github-actions
```

Add `sahmito-deploy.pub` to the VPS user's `~/.ssh/authorized_keys`. Store the entire private key as the GitHub secret `VPS_SSH_PRIVATE_KEY`. Never commit either key.

Obtain the VPS host key fingerprint through the provider console or another trusted channel before trusting it. Store a complete OpenSSH `known_hosts` line as `VPS_KNOWN_HOSTS`. `ssh-keyscan` can collect the line, but it does not by itself prove the host's identity.

## GitHub configuration

Create a GitHub environment named `production`. Add these environment secrets:

| Secret                | Value                                                   |
| --------------------- | ------------------------------------------------------- |
| `VPS_HOST`            | VPS hostname or IP address                              |
| `VPS_USER`            | Non-root SSH deployment user                            |
| `VPS_SSH_PRIVATE_KEY` | Complete private SSH key, including header/footer       |
| `VPS_KNOWN_HOSTS`     | Verified OpenSSH host-key line for the VPS and SSH port |

Add these environment variables:

| Variable                         | Required | Value                                                      |
| -------------------------------- | -------- | ---------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`            | Yes      | Public absolute API base URL                               |
| `NEXT_PUBLIC_IMAGE_ASSETS_URL`   | Yes      | Public absolute image-assets base URL                      |
| `NEXT_PUBLIC_TELEMETRY_ENDPOINT` | No       | Public telemetry receiver URL                              |
| `VPS_SSH_PORT`                   | No       | SSH port; defaults to `22`                                 |
| `APP_PORT`                       | No       | Published HTTP port; defaults to `80`                      |
| `APP_URL`                        | No       | Public app origin used for the final external health check |

Finally, add the repository-level Actions variable `DEPLOY_ENABLED=true`. It must be a repository variable—not only an environment variable—because GitHub evaluates the deployment job condition before the job enters the `production` environment. Set this last, after all secrets and variables are present.

For tighter controls, configure required reviewers and deployment-branch rules on the `production` environment. The workflow already limits automatic deployments to successful `master` pushes and prevents concurrent production deployments.

## First deployment

1. Commit and push these deployment files to GitHub.
2. Confirm the `CI` workflow passes on `master`.
3. Configure the `production` environment and repository variable above.
4. Push a new commit to `master`, or rerun the workflow for the current `master` commit.
5. On the VPS, verify:

   ```bash
   docker ps
   docker logs sahmito-proxy --tail 100
   curl --fail http://127.0.0.1/api/health
   ```

GitHub Actions logs into GHCR on the VPS only long enough to pull the image, then logs out. This works for private repositories without storing a long-lived registry token on the server.

## HTTPS and DNS

The included nginx container serves HTTP. Point the domain's DNS record to the VPS before enabling public traffic. Once the domain is known, terminate TLS either at a trusted external proxy/load balancer or by adding a certificate-aware reverse proxy on the VPS. Do not expose login traffic publicly over plain HTTP.

If another host-level reverse proxy already owns ports 80/443, set `APP_PORT` to an unused loopback/firewall-protected port and route that proxy to it. Restrict the port at the VPS firewall; Docker-published ports are otherwise reachable on all host interfaces.

## Rollback and diagnostics

Every image has the full Git commit SHA as its immutable tag. To roll back, authenticate the VPS to GHCR and run the deploy script with a previously successful SHA:

```bash
cd ~/sahmito
./deploy/deploy.sh ghcr.io/OWNER/REPOSITORY PREVIOUS_40_CHARACTER_COMMIT_SHA 80
```

Useful diagnostics:

```bash
docker ps --all
docker logs sahmito-app-blue --tail 100
docker logs sahmito-app-green --tail 100
docker logs sahmito-proxy --tail 100
```

The active color is recorded in `~/sahmito/deploy/.active-color`. Deployment state files are ignored by Git.

## Local Docker deployment

The root `docker-compose.yml` remains available for local or manual builds. It reads build arguments from `.env.production`:

```bash
docker compose --env-file .env.production up -d --build proxy app-blue
```

The PowerShell helper uses the same file:

```powershell
./deploy/zero-downtime-deploy.ps1
```

Because `NEXT_PUBLIC_*` values are embedded in the browser bundle, changing them always requires building a new image.
