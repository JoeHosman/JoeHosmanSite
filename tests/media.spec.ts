import { test, expect } from "@playwright/test";

for (const route of [
  "projects/e2e-fixture-art/",
  "career/e2e-fixture-career/",
]) {
  test(`embedded photos and video work at ${route}`, async ({
    page,
    request,
    baseURL,
  }) => {
    test.skip(
      Boolean(process.env.E2E_EMPTY),
      "Requires published test fixtures",
    );
    await page.goto(route);
    const gallery = page.getByRole("region", { name: "Project media" });
    const photo = gallery.getByRole("img", {
      name: "Gallery process photograph.",
    });
    await photo.scrollIntoViewIfNeeded();
    await expect(photo).toBeVisible();
    await expect
      .poll(() => photo.evaluate((img: HTMLImageElement) => img.naturalWidth))
      .toBeGreaterThan(0);
    const base = new URL(baseURL!).pathname;
    await expect(
      gallery.getByRole("link", { name: /Open full photo/ }),
    ).toHaveAttribute("href", `${base}images/e2e-fixture.svg`);
    const video = gallery.locator("video");
    await expect(video).toHaveAttribute(
      "poster",
      `${base}images/e2e-fixture.svg`,
    );
    await expect(video.locator("source")).toHaveAttribute(
      "src",
      `${base}media/e2e-fixture.mp4`,
    );
    expect((await request.get(`${base}images/e2e-fixture.svg`)).ok()).toBe(
      true,
    );
    expect(
      await video.evaluate((element: HTMLVideoElement) => ({
        controls: element.controls,
        inline: element.playsInline,
        autoplay: element.autoplay,
        preload: element.preload,
      })),
    ).toEqual({
      controls: true,
      inline: true,
      autoplay: false,
      preload: "none",
    });
    await video.scrollIntoViewIfNeeded();
    await video.evaluate((element: HTMLVideoElement) => element.play());
    await expect
      .poll(() =>
        video.evaluate((element: HTMLVideoElement) => element.currentTime),
      )
      .toBeGreaterThan(0.15);
    await video.evaluate((element: HTMLVideoElement) => element.pause());
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}
