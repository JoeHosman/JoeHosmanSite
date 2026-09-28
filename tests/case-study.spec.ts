import { test, expect } from "@playwright/test";

test("case study chapters stay connected and readable under the deployment base", async ({
  page,
  baseURL,
}) => {
  await page.goto("projects/struxos-conductor/product/");
  const navigation = page.getByRole("navigation", {
    name: "Case study chapters",
    exact: true,
  });
  const links = await navigation
    .getByRole("link")
    .evaluateAll((items) =>
      items.map((item) => ({
        text: item.textContent!.trim(),
        href: item.getAttribute("href")!,
      })),
    );
  expect(links).toHaveLength(5);
  for (const link of links) {
    expect(link.href.startsWith(new URL(baseURL!).pathname)).toBe(true);
    const response = await page.goto(new URL(link.href, baseURL).href);
    expect(response!.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(link.text);
    await expect(page.locator('.chapter-nav [aria-current="page"]')).toHaveText(
      link.text,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("projects/struxos-conductor/validation/");
  const screenshot = page.getByRole("img", {
    name: /Recorded StruxOs test evidence card/,
  });
  await expect(screenshot).toBeVisible();
  expect(
    await screenshot.evaluate(
      (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
    ),
  ).toBe(true);
});
