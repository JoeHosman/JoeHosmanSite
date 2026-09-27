import { test } from "node:test";
import assert from "node:assert/strict";
import { validateFrontmatter } from "../src/lib/validate-source.ts";

const entry = (date: string) =>
  `---\ntitle: Work\nsummary: A project\ndate: ${date}\ncategories: [art]\nstatus: completed\n---\nBody`;
test("source validation rejects unquoted impossible dates before YAML timestamp coercion", () => {
  assert.throws(
    () => validateFrontmatter(entry("2026-02-30"), "projects", "bad-date.md"),
    /bad-date.md/,
  );
  assert.doesNotThrow(() =>
    validateFrontmatter(entry("2024-02-29"), "projects", "leap-day.md"),
  );
  assert.doesNotThrow(() =>
    validateFrontmatter(entry('"2026-09-27"'), "projects", "quoted.md"),
  );
});
test("source errors include the file, including missing frontmatter", () => {
  assert.throws(
    () => validateFrontmatter("No settings", "career", "missing.md"),
    /missing.md/,
  );
});
