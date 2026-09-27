import assert from "node:assert/strict";
import { test } from "node:test";
import { formatCareerDate, formatProjectDate } from "../src/lib/dates.ts";
import {
  visibleEntries,
  selectHighlights,
  sortCareer,
  sortProjects,
} from "../src/lib/content.ts";
import { careerSchema, projectSchema } from "../src/lib/content-schema.ts";

const project = {
  title: "A build",
  summary: "What was built.",
  date: "2026-09-27",
  categories: ["art"],
  status: "completed",
};
const career = {
  company: "Example company",
  role: "Example role",
  summary: "Example responsibility.",
  start: "2020",
  end: "",
};

test("career date display retains original precision", () => {
  assert.equal(formatCareerDate("2020"), "2020");
  assert.equal(formatCareerDate("2020-09"), "Sep 2020");
  assert.equal(formatCareerDate(""), "Present");
});
test("project validation rejects impossible dates, empty categories, and undocumented statuses", () => {
  assert.equal(projectSchema.safeParse(project).success, true);
  for (const value of [
    { date: "2026-02-30" },
    { date: "2026-13-01" },
    { categories: [] },
    { categories: [" "] },
    { status: "unknown" },
    { title: " " },
  ]) {
    assert.equal(
      projectSchema.safeParse({ ...project, ...value }).success,
      false,
    );
  }
  assert.equal(
    projectSchema.safeParse({ ...project, date: new Date("2024-02-29") })
      .success,
    true,
  );
});
test("cover images require descriptions", () => {
  assert.equal(
    projectSchema.safeParse({ ...project, cover: "/images/test.jpg" }).success,
    false,
  );
  assert.equal(
    projectSchema.safeParse({
      ...project,
      cover: "/images/test.jpg",
      cover_alt: "Work in progress.",
    }).success,
    true,
  );
});
test("project years retain their precision and sort with exact dates", () => {
  const data = projectSchema.parse({ ...project, date: "2025" });
  assert.equal(data.date, "2025");
  assert.equal(formatProjectDate(data.date), "2025");
  assert.equal(formatProjectDate(new Date("2024-02-29")), "February 29, 2024");
  assert.equal(
    projectSchema.safeParse({ ...project, date: "0000" }).success,
    false,
  );
  const entries = [
    { id: "year", data },
    { id: "older", data: { date: new Date("2024-12-31") } },
    { id: "newer", data: { date: new Date("2026-01-01") } },
  ];
  assert.deepEqual(
    sortProjects(entries).map((entry) => entry.id),
    ["newer", "year", "older"],
  );
});
test("career dates reject impossible ranges without inventing precision", () => {
  assert.equal(careerSchema.safeParse(career).success, true);
  assert.equal(
    careerSchema.safeParse({ ...career, start: "2020-13" }).success,
    false,
  );
  assert.equal(
    careerSchema.safeParse({ ...career, start: "2020-13", end: "2022" })
      .success,
    false,
  );
  assert.equal(
    careerSchema.safeParse({ ...career, end: "2019" }).success,
    false,
  );
  assert.equal(
    careerSchema.safeParse({ ...career, start: "2020-09", end: "2020" })
      .success,
    true,
  );
  assert.equal(
    careerSchema.safeParse({ ...career, start: "2020-09", end: "2020-08" })
      .success,
    false,
  );
});
test("new content defaults to draft and production excludes it", () => {
  assert.equal(projectSchema.parse(project).draft, true);
  const entries = [
    { data: { draft: true, featured: true } },
    { data: { draft: false, featured: false } },
  ];
  assert.deepEqual(visibleEntries(entries, false), [entries[1]]);
  assert.deepEqual(visibleEntries(entries, true), entries);
  assert.deepEqual(selectHighlights(visibleEntries(entries, false)), [
    entries[1],
  ]);
});
test("homepage selection respects featured content and limits", () => {
  const entries = [false, true, true, true, true].map((featured) => ({
    data: { featured },
  }));
  assert.deepEqual(selectHighlights(entries), entries.slice(1, 4));
  assert.deepEqual(selectHighlights([]), []);
});
test("date ordering is stable for tied dates", () => {
  const rows = [
    { id: "b", data: { date: new Date("2020-01-01"), start: "2020" } },
    { id: "a", data: { date: new Date("2020-01-01"), start: "2020" } },
    { id: "c", data: { date: new Date("2022-01-01"), start: "2022" } },
  ];
  assert.deepEqual(
    sortCareer(rows).map((x) => x.id),
    ["c", "a", "b"],
  );
  assert.deepEqual(
    sortProjects(rows).map((x) => x.id),
    ["c", "a", "b"],
  );
  assert.equal(rows[0].id, "b");
});
