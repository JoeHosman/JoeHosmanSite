import assert from "node:assert/strict";
import { test } from "node:test";
import { withBase, normalizeBase } from "../src/lib/urls.mjs";
import siteUrls from "../src/plugins/rehype-site-urls.mjs";

test("base paths preserve anchors, external references, and query strings", () => {
  assert.equal(
    withBase("/projects/?sort=new#work", "/JoeHosmanSite/"),
    "/JoeHosmanSite/projects/?sort=new#work",
  );
  assert.equal(
    withBase("/JoeHosmanSite/images/a.jpg", "/JoeHosmanSite/"),
    "/JoeHosmanSite/images/a.jpg",
  );
  assert.equal(
    withBase("/JoeHosmanSite-other/a", "/JoeHosmanSite/"),
    "/JoeHosmanSite/JoeHosmanSite-other/a",
  );
  assert.equal(withBase("/", "/JoeHosmanSite/"), "/JoeHosmanSite/");
  for (const url of [
    "#work",
    "https://example.com/a",
    "mailto:a@example.com",
    "//example.com/a",
    "photo.jpg",
  ]) {
    assert.equal(withBase(url, "/JoeHosmanSite/"), url);
  }
});
test("base configuration normalizes slashes and rejects URLs", () => {
  assert.equal(normalizeBase("JoeHosmanSite"), "/JoeHosmanSite/");
  assert.equal(normalizeBase(""), "/");
  assert.throws(() => normalizeBase("https://example.com"));
});
test("Markdown links and images receive the deployment base", () => {
  const tree = {
    type: "root",
    children: [
      {
        type: "element",
        tagName: "a",
        properties: { href: "/career/" },
        children: [],
      },
      {
        type: "element",
        tagName: "img",
        properties: { src: "/images/a.jpg" },
        children: [],
      },
    ],
  };
  siteUrls({ base: "/portfolio/" })(tree);
  assert.equal(tree.children[0].properties.href, "/portfolio/career/");
  assert.equal(tree.children[1].properties.src, "/portfolio/images/a.jpg");
});
