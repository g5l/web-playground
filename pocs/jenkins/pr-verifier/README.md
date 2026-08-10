# Jenkins PR Verifier POC

A self-contained local Jenkins setup that runs a verification pipeline against every pull request.

## Components

| Component | Responsibility |
|-----------|---------------|
| Jenkins server (Docker) | Runs the pipeline. We containerize it so the POC is reproducible and doesn't pollute your machine. |
| GitHub webhook | Notifies Jenkins the instant a PR event happens (opened, synchronize). Without it, Jenkins would have to poll. |
| Jenkinsfile (Pipeline as Code) | The actual verification logic, versioned in the repo, not clicked together in the Jenkins UI. This is the "PRV" itself. |
| GitHub credentials (PAT or GitHub App) | Lets Jenkins authenticate to GitHub to post commit statuses/checks back. |
| Sample app | Something small to actually verify (lint + test), so the pipeline has real work to do. |
| Multibranch Pipeline job | Jenkins config that discovers branches/PRs from the GitHub repo and auto-creates a pipeline run per PR. |

## Structure

```
.
├── docker-compose.yml       # Spins up Jenkins locally
├── jenkins/
│   ├── Dockerfile           # Jenkins LTS + plugins + Node.js baked in
│   ├── plugins.txt          # Plugin list consumed by jenkins-plugin-cli
│   └── security.groovy      # Seeds admin/admin credentials on first boot
├── sample-app/              # Tiny Node.js app used as the verification target
│   ├── package.json
│   ├── src/index.js
│   └── test/index.test.js
└── Jenkinsfile              # Declarative PR verifier pipeline
```

## Prerequisites

- Docker and Docker Compose
- A GitHub repository (or any Git remote) that Jenkins can reach
- Optionally: [ngrok](https://ngrok.com/) to expose your local Jenkins to GitHub webhooks

## Quick start

### 1. Start Jenkins

```bash
docker compose up --build -d
```

Jenkins will be available at http://localhost:8080 after about 30 seconds.

Default credentials: `admin` / `admin`

### 2. Create a Pipeline job

1. Open http://localhost:8080 and log in.
2. Click **New Item**, name it (e.g. `pr-verifier`), choose **Pipeline**, and click OK.
3. Under **Pipeline**, set **Definition** to **Pipeline script from SCM**.
4. Set **SCM** to **Git** and paste your repository URL.
5. Set **Script Path** to `pocs/jenkins/pr-verifier/Jenkinsfile` (adjust to your repo layout).
6. Save.

### 3. Configure a GitHub webhook (optional, for automatic PR triggers)

If you want the pipeline to fire automatically on PR events:

1. Expose Jenkins via ngrok:
   ```bash
   ngrok http 8080
   ```
2. In your GitHub repository, go to **Settings > Webhooks > Add webhook**.
3. Set **Payload URL** to `https://<ngrok-id>.ngrok.io/github-webhook/`.
4. Set **Content type** to `application/json`.
5. Select **Pull requests** as the event to send.
6. Save the webhook.

Without a webhook you can still trigger the pipeline manually from the Jenkins UI.

### 4. Run the sample tests locally

```bash
cd sample-app
npm test
```

## How the pipeline works

| Stage | What it does |
|-------|-------------|
| Checkout | Clones the PR branch via `checkout scm` |
| Install | Runs `npm install` inside `sample-app/` |
| Test | Runs `npm test` (Node built-in test runner) |

On success the build is marked green; on failure it is marked red. When the GitHub plugin is fully configured it also posts a commit status back to the PR.

## Stopping Jenkins

```bash
docker compose down
```

To also remove the persisted Jenkins home volume:

```bash
docker compose down -v
```
