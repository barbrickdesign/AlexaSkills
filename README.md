# AlexaSkills
A whole bunch of Alexa Skills made by barbrickdesign

## GitHub Actions deployment

This repository now includes a manual workflow at `/home/runner/work/AlexaSkills/AlexaSkills/.github/workflows/deploy-generated-skills.yml` for deploying generated skills from GitHub Actions.

### Required repository secrets

- `ASK_CLIENT_ID`
- `ASK_CLIENT_SECRET`
- `ASK_REFRESH_TOKEN`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN` (optional when using temporary AWS credentials)

### How to run it

1. Open the **Actions** tab in GitHub.
2. Select **Deploy generated Alexa skills**.
3. Click **Run workflow**.
4. Choose `single` to deploy one skill or `all` to deploy every deployable folder under `/home/runner/work/AlexaSkills/AlexaSkills/GeneratedSkills`.
5. If you choose `single`, enter the exact skill directory name, such as `007 Trivia Challenge`.

### How to generate the Alexa refresh token

1. Run `ask util generate-lwa-tokens`.
2. Sign in with the Amazon developer account that owns the skills.
3. Copy only the returned `refresh_token` value into the `ASK_REFRESH_TOKEN` GitHub secret.
4. Do not store the short-lived `access_token` in GitHub Actions secrets.

If the token output was exposed outside your local machine, revoke it and generate a new one before using this workflow.

### What the workflow does

- Installs Node.js and the ASK CLI.
- Authenticates with Alexa and AWS using GitHub repository secrets.
- Finds deployable skills by locating folders in `/home/runner/work/AlexaSkills/AlexaSkills/GeneratedSkills` that contain `ask-resources.json`.
- Installs Lambda dependencies for each selected skill before deployment.
- Deploys either the requested skill or every discovered skill.
- Writes a success/failure summary so it is easy to see which skill failed.
