import { test, expect } from "@playwright/test";

[
  {
    path: "/",
    name: "index.png",
  },
  {
    path: "/tech",
    name: "tech.png",
  },
  {
    path: "/hobby",
    name: "hobby.png",
  },
].forEach(({ path, name }) => {
  test(`Snapshot with "${path}"`, async ({ page }) => {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    if (path === "/") {
      // スナップショット時にアイコン画像のロードが不安定なので待つ
      const image = page.getByAltText("nekko1119のアイコン");
      await expect(image).toBeVisible();
      await expect(image).not.toHaveJSProperty("naturalWidth", 0);
    }
    await expect(page).toHaveScreenshot(name, { fullPage: true });
  });
});
