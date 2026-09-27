import { test, expect } from "@playwright/test";

test("editorial shell links to readable sections and fits the viewport", async ({
  page,
}) => {
  await page.goto("./");
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Good work starts",
  );
  for (const route of ["career", "projects", "about"]) {
    await page.goto(`${route}/`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("keyboard users can skip navigation", async ({ page }) => {
  await page.goto("./");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("production never publishes draft links, categories, or detail URLs", async ({
  page,
  request,
}) => {
  await page.goto("projects/");
  await expect(page.getByText("Unpublished test project")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Secret test category" }),
  ).toHaveCount(0);
  expect((await request.get("projects/example-project/")).status()).toBe(404);
  expect((await request.get("career/example-role/")).status()).toBe(404);
  expect((await request.get("career/e2e-fixture-draft/")).status()).toBe(404);
  expect((await request.get("projects/e2e-fixture-draft/")).status()).toBe(404);
  for (const route of ["./", "career/"]) {
    await page.goto(route);
    await expect(page.getByText("Unpublished test role")).toHaveCount(0);
  }
});

test("empty published collections have useful indexes", async ({ page }) => {
  test.skip(!process.env.E2E_EMPTY, "Run with E2E_EMPTY=1");
  await page.goto("career/");
  await expect(
    page.getByText("Career entries will appear here as they are added."),
  ).toBeVisible();
  await page.goto("projects/");
  await expect(
    page.getByText("Projects will appear here as they are added."),
  ).toBeVisible();
  await expect(
    page.getByRole("group", { name: "Filter projects by category" }),
  ).toHaveCount(0);
});

test("career comes before projects and preserves date precision", async ({
  page,
}) => {
  test.skip(Boolean(process.env.E2E_EMPTY), "Requires published test fixtures");
  await page.goto("./");
  const headings = await page
    .getByRole("heading", { level: 2 })
    .allTextContents();
  expect(headings).toEqual(["A career in industry", "From the workshop"]);
  await page.getByRole("link", { name: "Test role", exact: true }).click();
  await expect(page.locator(".detail-meta")).toHaveText("2020 — Sep 2022");
  await expect(
    page.getByRole("heading", { name: "The work", exact: true }),
  ).toBeVisible();
});

test("listing headings follow the page title without skipping a level", async ({
  page,
}) => {
  test.skip(Boolean(process.env.E2E_EMPTY), "Requires published test fixtures");
  await page.goto("career/");
  await expect(
    page.getByRole("heading", { level: 2, name: "Test role", exact: true }),
  ).toBeVisible();
  await page.goto("projects/");
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Test wood and art",
      exact: true,
    }),
  ).toBeVisible();
});

test("category filters support overlapping tags and restore all projects", async ({
  page,
}) => {
  test.skip(Boolean(process.env.E2E_EMPTY), "Requires published test fixtures");
  await page.goto("projects/");
  for (const category of ["Art", "Woodworking", "All"]) {
    const button = page.getByRole("button", { name: category, exact: true });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(button).toBeFocused();
    await expect(
      page.getByRole("link", { name: "Test wood and art", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Test software project", exact: true }),
    ).toBeHidden();
    await expect(page.locator("[data-result-count]")).toHaveText("1 project");
  }
  await page.getByRole("button", { name: "Software", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Test software project", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "All projects", exact: true }).click();
  await expect(page.locator("[data-project]:visible")).toHaveCount(2);
});

test("projects remain readable with JavaScript disabled", async ({
  browser,
  baseURL,
}) => {
  test.skip(Boolean(process.env.E2E_EMPTY), "Requires published test fixtures");
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  await page.goto("projects/");
  await expect(
    page.getByRole("link", { name: "Test wood and art", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Test software project", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("group", { name: "Filter projects by category" }),
  ).toBeHidden();
  await context.close();
});

test("detail media and Markdown links work under the configured base", async ({
  page,
  baseURL,
}) => {
  test.skip(Boolean(process.env.E2E_EMPTY), "Requires published test fixtures");
  await page.goto("projects/e2e-fixture-art/");
  await expect(
    page.getByRole("img", { name: "A portrait-format test image." }),
  ).toBeVisible();
  const image = page.getByRole("img", {
    name: "Test process image",
    exact: true,
  });
  await expect(image).toBeVisible();
  expect(
    await image.evaluate(
      (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
    ),
  ).toBe(true);
  const href = await page
    .getByRole("link", { name: "My career", exact: true })
    .getAttribute("href");
  expect(href).toBe(`${new URL(baseURL!).pathname}career/`);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.goto("projects/e2e-fixture-software/");
  await expect(page.locator(".cover-figure")).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Notes", exact: true }),
  ).toBeVisible();
});
