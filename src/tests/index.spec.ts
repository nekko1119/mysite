import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const paths = [
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
];

// アイコン画像のロードが不安定なので待つ
async function awaitIconVisible({ page }: { page: Page }) {
  const image = page.getByAltText("nekko1119のアイコン");
  await expect(image).toBeVisible();
  await expect(image).not.toHaveJSProperty("naturalWidth", 0);
}

paths.forEach(({ path, name }) => {
  test(`Snapshot with "${path}"`, { tag: ["@vrt"] }, async ({ page }) => {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    if (path === "/") {
      // アイコン画像のロードが不安定なので待つ
      await awaitIconVisible({ page });
    }
    await expect(page).toHaveScreenshot(name, { fullPage: true });
  });
});

paths.forEach(({ path }) => {
  test(`Axe core with "${path}"`, { tag: ["@axe"] }, async ({ page }) => {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    if (path === "/") {
      await awaitIconVisible({ page });
    }
    const axeResults = await new AxeBuilder({ page }).analyze();
    expect(axeResults.violations).toEqual([]);
  });
});
