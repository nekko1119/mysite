// @ts-check

/** @param {import('@actions/github-script').AsyncFunctionArguments} AsyncFunctionArguments */
export default async ({ github, core, context }) => {
  const body = `
## VRT Results

Artifact](https://github.com/${github.repository}/actions/runs/${github.run_id})

<!-- playwright-vrt-comment -->
`;

  const { owner, repo } = context.repo;
  const issueNumber = context.issue.number;

  const comments = github.rest.issues.listComments({
    owner,
    repo,
    issue_number: issueNumber,
  });

  // 既存コメントを取得し、VRTコメントが存在すれば上書き、なければ新規投稿する
  const existingComment = (await comments).data.find(
    (comment) =>
      comment.user?.type === "Bot" &&
      comment.body?.includes("<!-- playwright-vrt-comment -->"),
  );
  if (existingComment) {
    await github.rest.issues.updateComment({
      owner,
      repo,
      comment_id: existingComment.id,
      body,
    });
    core.info(`Updated existing comment: ${existingComment.html_url}`);
  } else {
    const createdComment = await github.rest.issues.createComment({
      ...context.repo,
      issue_number: context.issue.number,
      body,
    });
    core.info(`Created comment: ${createdComment.data.html_url}`);
  }
};
