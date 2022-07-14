# github-auto-merge
A github custom action to fetch a Github token from vault, approve the PR and enable auto merge for the PR so that once it passes all the PR checks it will be merged.

## Requirements
- The repo has to have "Allow auto-merge" (in repo settings) checked in order to work
![Screenshot 2022-05-20 at 09 39 07](https://user-images.githubusercontent.com/7535187/169478228-dd499b9f-ec78-4c20-a2a5-b5c16a5dd2c1.png)
- In addition the `main` (or `master`) branch being merged to should have branch protection rules. For example, when a branch protection rule enforces "Require pull request reviews before merging" or "Require status checks to pass before merging".
- The repo has to ask for `dependabot` policy for `github-action` service in `.contentful/vault-secrets.yaml` file. This way Vault knows that it can grant the required token. More info to be added, example [here](https://github.com/contentful/locomotive/blob/main/.contentful/vault-secrets.yaml)

## Usage

To reference the action, create a workflow in your project in `.github/workflows/` e.g.

`.github/workflows/dependabot-approve-and-request-merge.yml`:

```yaml
name: "dependabot approve-and-request-merge"

on: pull_request_target

jobs:
  worker:
    permissions:
      contents: write
      id-token: write
    runs-on: ubuntu-latest
    if: github.actor == 'dependabot[bot]'
    steps:
      - uses: contentful/github-auto-merge@v1
        with:
          VAULT_URL: ${{ secrets.VAULT_URL }} # this is an organisation level secret, you do not need to add it to your repo
```
You can see an example in this repo [example.yml](example.yml)
