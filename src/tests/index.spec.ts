import { test, expect } from "@playwright/test";

[
  {
    path: "/",
  },
  {
    path: "/tech",
  },
  {
    path: "/hobby",
  },
].forEach(({ path }) => {
  test(`Snapshot with "${path}"`, async ({ page }) => {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
