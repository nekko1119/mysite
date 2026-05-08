// @ts-check
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";

/**
 * @import { JSONReport, TestStatus } from '@playwright/test/reporter';
 */

/**
 * @param {{ reportPath: string }} param0
 * @return {Promise<Record<TestStatus | "total", number>>}
 */
async function aggregateTestResultsFromReportJson({ reportPath }) {
  if (!existsSync(reportPath)) {
    throw new Error(`reportPath not found: ${reportPath}`);
  }
  const reportJson = await readFile(reportPath, "utf-8");

  /** @type {JSONReport} */
  const report = JSON.parse(reportJson);

  /** @type {Record<TestStatus | "total", number>} */
  const result = {
    total: 0,
    passed: 0,
    failed: 0,
    timedOut: 0,
    skipped: 0,
    interrupted: 0,
  };

  report.suites.forEach((suite) => {
    suite.specs.forEach((spec) => {
      spec.tests.forEach((test) => {
        test.results.forEach((r) => {
          if (r.status !== undefined) {
            result.total++;
            result[r.status]++;
          }
        });
      });
    });
  });
  return result;
}

/**
 * @param {Record<TestStatus | "total", number>} result
 * @return {string}
 */
function formatResultToTable({
  total,
  passed,
  failed,
  timedOut,
  skipped,
  interrupted,
}) {
  const table = `
|  Item   |   Count    |
|-------- |-----------:|
| Total   | ${total}   |
| Passed  | ${passed}  |
| Failed  | ${failed}  |
| Skipped | ${skipped} |
`;

  const allPassed =
    total !== 0 && failed === 0 && timedOut === 0 && interrupted === 0;

  const descrption = allPassed
    ? "✨️✨️ VRTの差分はありません ✨️✨️"
    : "VRTの差分がありました。意図した差分かどうか確認してください";

  const text = `
${descrption}

${table}
`;
  return text;
}

/** @param {import('@actions/github-script').AsyncFunctionArguments} AsyncFunctionArguments */
export default async ({ github, core, context }) => {
  const markerComment = "<!-- playwright-vrt-comment -->";
  const { owner, repo } = context.repo;

  const reportPath = process.env.VRT_REPORT_PATH;
  if (!reportPath) {
    throw new Error("VRT_REPORT_PATHが設定されていません");
  }
  const result = await aggregateTestResultsFromReportJson({ reportPath });
  const text = formatResultToTable(result);
  const body = `
## VRT Results

${text}

[Artifact](https://github.com/${owner}/${repo}/actions/runs/${context.runId})

${markerComment}
`;

  const issueNumber = context.issue.number;

  // listComments は最大30件の取得のため、コメントが多いPRではVRTコメントが取得できない可能性がある
  // その場合はページネーションAPIを使うこと
  // see https://github.com/nekko1119/mysite/pull/22#discussion_r3208683505
  const comments = github.rest.issues.listComments({
    owner,
    repo,
    issue_number: issueNumber,
  });

  // 既存コメントを取得し、VRTコメントが存在すれば上書き、なければ新規投稿する
  const existingComment = (await comments).data.find(
    (comment) =>
      comment.user?.type === "Bot" && comment.body?.includes(markerComment),
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
