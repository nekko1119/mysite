// @ts-check

/** @param {import('@actions/github-script').AsyncFunctionArguments} AsyncFunctionArguments */
export default async ({ github, context }) => {
  await github.rest.issues.createComment({
    ...context.repo,
    issue_number: context.issue.number,
    body: `## Playwrightレポート\n[Artifact](https://github.com/${github.repository}/actions/runs/${github.run_id})`,
  });
};
