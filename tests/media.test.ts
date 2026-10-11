import assert from "node:assert/strict";
import { test } from "node:test";
import { projectSchema, careerSchema } from "../src/lib/content-schema.ts";

const image = {
  type: "image",
  src: "/images/build.webp",
  alt: "The assembled keyboard on a workbench.",
  caption: "After soldering and assembly.",
  width: 1200,
  height: 900,
};
const video = {
  type: "video",
  src: "/media/build.mp4",
  poster: "/images/build-poster.webp",
  caption: "The machine's first movement test.",
  width: 720,
  height: 1280,
};
const entries = [
  [
    projectSchema,
    {
      title: "Build",
      summary: "A build.",
      date: "unknown",
      categories: ["electronics"],
    },
  ],
  [
    careerSchema,
    {
      company: "Company",
      role: "Engineer",
      summary: "The work.",
      start: "2020",
    },
  ],
] as const;

test("project and career entries retain ordered embedded media", () => {
  for (const [schema, entry] of entries) {
    const result = schema.parse({ ...entry, media: [image, video] });
    assert.deepEqual(result.media, [image, video]);
  }
});

test("galleries require image descriptions and video posters", () => {
  const { poster, ...withoutPoster } = video;
  for (const invalid of [
    { ...image, alt: " " },
    { ...image, width: 0 },
    { ...image, height: -1 },
    { ...video, caption: " " },
    withoutPoster,
  ]) {
    for (const [schema, entry] of entries) {
      assert.equal(
        schema.safeParse({ ...entry, media: [invalid] }).success,
        false,
      );
    }
  }
});
