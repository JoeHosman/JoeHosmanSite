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
  expect(links).toHaveLength(10);
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

  for (const [path, name] of [
    ["projects/struxos-conductor/harness/", /Diagram of Conductor's cycle/],
    ["projects/struxos-conductor/development/", /Stacked bar chart of daily StruxOs commits/],
  ] as const) {
    await page.goto(path);
    const figure = page.getByRole("img", { name }).first();
    await figure.scrollIntoViewIfNeeded();
    await expect(figure).toBeVisible();
    await expect
      .poll(() =>
        figure.evaluate(
          (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
});

test("the essay is published and links back to the case study", async ({
  page,
  baseURL,
}) => {
  const response = await page.goto("writing/agents-game-goals/");
  expect(response!.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "AI agents will game any goal that text can satisfy",
  );
  const link = page.getByRole("link", {
    name: "StruxOs and Conductor: an experiment in hands-off development",
  });
  expect(await link.getAttribute("href")).toBe(
    `${new URL(baseURL!).pathname}projects/struxos-conductor/`,
  );
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBe(true);
});
