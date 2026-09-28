import { writeFile, mkdir, mkdtemp, cp, rm } from "node:fs/promises";
import { spawn } from "node:child_process";
import { resolve, join } from "node:path";

// A fresh site copy makes tests independent of Joe's growing content archive.
await mkdir(".superpowers", { recursive: true });
const testRoot = await mkdtemp(resolve(".superpowers/e2e-"));
let child;
let cleanupPromise;
async function create(path, contents) {
  await writeFile(join(testRoot, path), contents, { flag: "wx" });
}
async function cleanup() {
  if (!cleanupPromise) {
    cleanupPromise = (async () => {
      child?.kill("SIGTERM");
      await rm(testRoot, { recursive: true, force: true });
    })();
  }
  await cleanupPromise;
}
for (const signal of ["SIGINT", "SIGTERM"])
  process.once(signal, () => {
    void cleanup().finally(() => process.exit(0));
  });
const env = { ...process.env, CI: "1", ASTRO_TELEMETRY_DISABLED: "1" };
try {
  for (const path of [
    "src",
    "astro.config.mjs",
    "tsconfig.json",
    "package.json",
  ]) {
    await cp(path, join(testRoot, path), { recursive: true });
  }
  await mkdir(join(testRoot, "content/projects"), { recursive: true });
  await mkdir(join(testRoot, "content/career"), { recursive: true });
  await cp("content/about.md", join(testRoot, "content/about.md"));
  await cp("content/case-studies", join(testRoot, "content/case-studies"), {
    recursive: true,
  });
  await cp(
    "public/images/projects/struxos-conductor",
    join(testRoot, "public/images/projects/struxos-conductor"),
    { recursive: true },
  );
  await create(
    "content/career/e2e-fixture-draft.md",
    `---
company: "Unpublished organization"
role: "Unpublished test role"
start: "2020"
summary: "Must never appear in production."
draft: true
featured: true
---
This career draft must not be published.
`,
  );
  if (!process.env.E2E_EMPTY) {
    await mkdir(join(testRoot, "public/images"), { recursive: true });
    await create(
      "public/images/e2e-fixture.svg",
      '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="240"><rect width="160" height="240" fill="#bbbba3"/><text x="12" y="45" fill="#30372d">Test image</text></svg>',
    );
    await create(
      "content/career/e2e-fixture-career.md",
      `---
company: "Test organization"
role: "Test role"
start: "2020"
end: "2022-09"
summary: "Test career summary."
draft: false
featured: true
---
## The work

A test career story.
`,
    );
    await create(
      "content/projects/e2e-fixture-art.md",
      `---
title: "Test wood and art"
summary: "An overlapping-category project."
date: "2026-09-27"
categories: [woodworking, art, all]
status: completed
draft: false
featured: true
cover: /images/e2e-fixture.svg
cover_alt: "A portrait-format test image."
---
## The idea

[My career](/career/)

![Test process image](/images/e2e-fixture.svg)

\`\`\`text
${"long-code-sample-".repeat(30)}
\`\`\`
`,
    );
    await create(
      "content/projects/e2e-fixture-software.md",
      `---
title: "Test software project"
summary: "A text-only project."
date: "2026-01-01"
categories: [software]
status: in-progress
draft: false
---
## Notes

A test project with no cover.
`,
    );
    await create(
      "content/projects/e2e-fixture-draft.md",
      `---
title: "Unpublished test project"
summary: "Must never appear in production."
date: "2026-09-27"
categories: [secret-test-category]
status: idea
draft: true
---
This test draft must not be published.
`,
    );
  }
  await new Promise((resolve, reject) => {
    child = spawn("npm", ["run", "build", "--", "--root", testRoot], {
      env,
      stdio: "inherit",
    });
    child.once("error", reject);
    child.once("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`Build failed (${code})`)),
    );
  });
  child = spawn(
    "npm",
    [
      "run",
      "preview",
      "--",
      "--root",
      testRoot,
      "--port",
      "4322",
      "--ignore-lock",
    ],
    { env, stdio: "inherit" },
  );
  child.once("error", async (error) => {
    console.error(error);
    await cleanup();
    process.exit(1);
  });
  child.once("exit", async (code) => {
    await cleanup();
    process.exit(code ?? 1);
  });
} catch (error) {
  console.error(error);
  await cleanup();
  process.exit(1);
}
