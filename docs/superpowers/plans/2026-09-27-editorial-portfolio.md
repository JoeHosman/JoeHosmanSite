# Career-First Editorial Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Joe's career-first editorial portfolio with Markdown authoring and a GitHub Pages deployment workflow.

**Architecture:** Astro statically generates pages from validated project and career collections. Shared editorial components present that content; small progressive-enhancement JavaScript filters projects. GitHub Actions builds and deploys the generated site.

**Tech Stack:** Astro 7.3.5, TypeScript, plain CSS, Node 24, npm, Node's test runner, Playwright for browser verification.

**Spec:** `docs/superpowers/specs/2026-09-27-editorial-portfolio-design.md`

## Global Constraints

- Joe selected the Editorial Profile layout and explicitly chose career first.
- Content is maintained through Markdown files and images, with GitHub as the host.
- Use Georgia and system sans-serif fonts initially. Avoid decorative animation.
- Preserve the current contracts in `templates/project.md`, `templates/career.md`, and `CONTENT_GUIDE.md`.
- Projects live in `content/projects/`, roles in `content/career/`, and images in `public/images/`.
- `draft: true` excludes an entry from production routes, indexes, filters, and homepage selections.
- Real employers, dates, achievements, and project claims require Joe's source content.
- All internal links and image URLs, including root-relative references inside Markdown, respect that base.
- Read every existing file before editing it; search callers before changing a function.
- Do not read or search `node_modules`, `.git`, `dist`, or `__pycache__`. Exercise built pages through the preview server instead of inspecting `dist` files.
- No Git repository currently exists. Save files locally; do not claim commits, a remote, or a live deployment. Commit only once Git is configured.

## Review Focus

1. Mixed-precision career dates must remain truthful: a year must not display as an invented January date. Pin in Task 1.
2. Repository subpaths must not double-prefix Markdown links or break images, anchors, external URLs, or query strings. Pin in Task 1 and Task 5.
3. Empty collections and text-only projects must remain usable without fabricated content. Pin in Task 3.
4. Draft entries must be unreachable in production even by their detail URLs. Pin in Task 5.
5. Multi-category projects and JavaScript-disabled browsing must retain access to every published project. Pin in Task 4.

## File map

| Files | Responsibility |
| --- | --- |
| `package.json`, `package-lock.json`, `tsconfig.json`, `.gitignore` | Reproducible toolchain and scripts. |
| `astro.config.mjs`, `src/config/site.ts` | Static build configuration and truthful site identity. |
| `src/content.config.ts`, `src/lib/content-schema.ts` | Collection loaders and metadata validation. |
| `src/lib/content.ts`, `src/lib/dates.ts` | Visibility, stable sorting, homepage selection, date display. |
| `src/lib/urls.mjs`, `src/plugins/rehype-site-urls.mjs` | Base-aware URLs in components and rendered Markdown. |
| `src/layouts/EditorialLayout.astro`, `src/styles/global.css` | Shared responsive shell and typography. |
| `src/components/IdentitySidebar.astro`, `CareerSummary.astro`, `ProjectSummary.astro` | Identity/navigation and reusable entry previews. All three under `src/components/`. |
| `src/pages/index.astro`, `career/index.astro`, `career/[...slug].astro`, `projects/index.astro`, `projects/[...slug].astro`, `about.astro`, `404.astro` | Page routes; nested paths are under `src/pages/`. |
| `src/scripts/project-filter.ts` | Accessible client-side category filter. |
| `content/about.md`, `content/career/example-role.md`, `content/projects/example-project.md` | Minimal confirmed About copy and explicitly marked local-only draft examples. |
| `tests/content.test.ts`, `tests/urls.test.mjs`, `tests/site.spec.ts`, `playwright.config.ts` | Focused content checks and browser flows. |
| `.github/workflows/deploy.yml`, `README.md`, `CONTENT_GUIDE.md` | Deployment and authoring instructions. |

## Task 1: Establish the static build and content contract

**Interfaces produced:**

```ts
// dates.ts
export function formatCareerDate(value: string): string;
export function careerDateBounds(value: string): { first: number; last: number };
// content.ts: operate on Astro-style entries, retaining their inferred types
export function visibleEntries<T extends { data: { draft: boolean } }>(entries: T[], includeDrafts: boolean): T[];
export function selectHighlights<T extends { data: { featured: boolean } }>(sortedEntries: T[], limit?: number): T[];
// urls.mjs
export function withBase(path, base = '/'); // returns string
```

- [ ] Read the current templates, guide, lockfile, and official Astro 7 documentation for collection loaders, schema imports, and static paths. Confirm installed Node meets Astro's engine constraint.
- [ ] Create package scripts and install Astro plus development checks. Pin installed versions in the lockfile; do not add React or a CSS framework.

```json
{
  "type": "module",
  "scripts": {
    "dev": "astro dev --host 127.0.0.1",
    "check": "astro check",
    "test": "node --test tests/*.test.ts tests/*.test.mjs",
    "build": "astro build",
    "preview": "astro preview --host 127.0.0.1",
    "test:e2e": "playwright test"
  }
}
```

- [ ] Add failing tests for validation, date precision, homepage selection, and URL handling. Representative assertions:

```ts
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { formatCareerDate } from '../src/lib/dates.ts';
import { visibleEntries, selectHighlights } from '../src/lib/content.ts';
test('year precision survives formatting', () => {
  assert.equal(formatCareerDate('2020'), '2020');
  assert.equal(formatCareerDate('2020-09'), 'Sep 2020');
  assert.equal(formatCareerDate(''), 'Present');
});
test('drafts stay out of public selections', () => {
  const entries = [{data:{draft:true,featured:true}}, {data:{draft:false,featured:false}}];
  assert.deepEqual(visibleEntries(entries, false), [entries[1]]);
  assert.deepEqual(selectHighlights(visibleEntries(entries, false)), [entries[1]]);
});
```

```js
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { withBase } from '../src/lib/urls.mjs';
test('repository base paths are applied exactly once', () => {
  assert.equal(withBase('/projects/?sort=new#work', '/JoeHosmanSite/'), '/JoeHosmanSite/projects/?sort=new#work');
  assert.equal(withBase('/JoeHosmanSite/images/a.jpg', '/JoeHosmanSite/'), '/JoeHosmanSite/images/a.jpg');
  for (const url of ['#work', 'https://example.com/a', 'mailto:a@example.com', '//example.com/a']) {
    assert.equal(withBase(url, '/JoeHosmanSite/'), url);
  }
});
```

- [ ] Run `npm test` and confirm failures come from missing implementation.
- [ ] Implement schemas matching the templates. Required text is nonempty; categories are nonempty trimmed strings; `featured` defaults false, `draft` defaults true; statuses are `idea`, `in-progress`, `completed`, `paused`; cover and alt default to empty strings. Reject a nonempty cover without nonempty alt text. Validate date strings by calendar round-trip, accepting YAML date values for project dates. For career date ordering, compare the start's earliest date with the end's latest date so year precision does not imply false precision.
- [ ] Add concrete schema cases for `2026-02-30`, career month `2020-13`, end `2019` with start `2020`, valid overlap start `2020-09` and end `2020`, and cover without alt. Use `projectSchema.safeParse` and `careerSchema.safeParse`; export those names from `content-schema.ts`.
- [ ] Implement `visibleEntries` as explicit draft filtering. `selectHighlights` chooses the featured subset when nonempty, otherwise all supplied entries, and slices to `limit = 3`. Sort before selection: date descending, slug ascending for ties. Export `sortProjects` and `sortCareer` from `content.ts` with Astro collection-entry array arguments and matching array return types.
- [ ] Configure glob loaders for the two content directories, keeping templates outside their input. Use `import.meta.env.DEV` as the sole default switch for showing drafts. Add draft examples with titles explicitly starting `Example:` and no real employer claims. About copy uses only Joe's name, stated experience, and stated interests.
- [ ] Implement root-relative URL rewriting in one helper shared by components and a rehype plugin. Traverse element nodes; rewrite `href` and `src` only for site-local absolute paths, preserving external/protocol-relative URLs, fragment-only references, and already-prefixed paths. Validate base configuration to start and end with `/`.
- [ ] Run `npm test`, `npm run check`, and `npm run build`. The build may contain only a temporary index until Task 2. No external publishing occurs.

## Task 2: Build the editorial shell and homepage

**Consumes:** Task 1 collections, `visibleEntries`, `sortCareer`, `sortProjects`, `selectHighlights`, `formatCareerDate`, and `withBase`.

**Produces:** `EditorialLayout` with `title` and `description` props plus default slot; `CareerSummary` and `ProjectSummary` each accept one corresponding Astro collection `entry`.

- [ ] Read the selected preview's editorial styles and structure. Implement the actual design with dedicated components instead of copying the preview's unrelated themes or scripts.
- [ ] Set design tokens and the main grid:

```css
:root { --paper:#f2eee5; --sidebar:#dedfcf; --ink:#30372d; --rust:#7d492e; --rule:#c5c5b7; }
.site-shell { display:grid; grid-template-columns:240px minmax(0,1fr); max-width:1180px; margin-inline:auto; }
.prose { max-width:68ch; line-height:1.75; }
.prose img { max-width:100%; height:auto; }
.prose pre { max-width:100%; overflow-x:auto; }
@media (max-width:760px) { .site-shell { grid-template-columns:1fr; } }
```

- [ ] Add the identity sidebar, active navigation state, skip link, semantic main region, page title, description, and canonical URL only when the deployment site URL is configured. Use wrapping visible mobile navigation. Avoid sticky behavior when the sidebar exceeds the viewport height.
- [ ] Build the homepage: introductory copy, up to three career highlights, up to three projects, then About invitation. Omit empty lists. Render local draft labels consistently on both summary and detail views. Display actual entry titles as links, rather than mockup arrows with no destination.
- [ ] Verify `npm run check` and `npm run build`. Inspect the development homepage at desktop and mobile widths; confirm career precedes projects, the sidebar stacks cleanly, and the page remains readable with no images.

## Task 3: Add career, project, and About reading pages

**Consumes:** Shell, summaries, collection schema, date formatting, URL helper.

**Produces:** The seven route shapes listed in the approved spec, including dynamic detail routes.

- [ ] Create indexes using the same visibility and sort functions as the homepage. Define explicit empty copy: `Career entries will appear here as they are added.` and `Projects will appear here as they are added.`
- [ ] Implement detail routes with the current Astro `getStaticPaths` and content rendering APIs. The path source must apply visibility before emitting routes:

```ts
export async function getStaticPaths() {
  const entries = visibleEntries(await getCollection('projects'), import.meta.env.DEV);
  return entries.map(entry => ({ params: { slug: entry.id }, props: { entry } }));
}
```

- [ ] Render project summary, categories, status, optional cover and Markdown. Render career company, title, precise date range and Markdown. Each page has one `h1`, return navigation, and inherited prose styles. Include a visible Draft badge in development for draft entries.
- [ ] Render `content/about.md` within the shared shell using Astro's Markdown import capability. Contact links appear only when real URLs are configured. Implement a 404 page with Home, Career, and Projects links.
- [ ] Add browser checks for empty production indexes, draft detail pages in development, and text-only project layout. Example public-route check:

```ts
test('empty career index is useful', async ({ page }) => {
  await page.goto('/career/');
  await expect(page.getByRole('heading', {level:1})).toHaveText('Career');
  await expect(page.getByText('Career entries will appear here as they are added.')).toBeVisible();
});
```

- [ ] Run type checks and build; use the preview server for production empty states. Use development mode for clearly labeled samples. Confirm long headings, portrait images, and code blocks do not cause horizontal page overflow.

## Task 4: Add accessible project filtering

**Consumes:** Published project categories and summary markup.

**Produces:** A small script attached only to the projects index.

- [ ] Derive sorted category options from entries visible in the current build. Render every project initially. Keep the filter controls hidden until the enhancement script initializes so nonfunctional controls do not appear without JavaScript.
- [ ] Give filter buttons `type="button"` and `aria-pressed`; give each card a JSON category array in `data-categories`. Add a polite result-count region. Use the following behavior:

```ts
const selected = button.dataset.category;
cards.forEach(card => {
  const categories: string[] = JSON.parse(card.dataset.categories ?? '[]');
  card.hidden = selected !== 'all' && !categories.includes(selected ?? '');
});
```

- [ ] Add a browser fixture with one project tagged both `art` and `woodworking`, and one `software` project. Verify the first appears under either matching category, switching to All restores both, and keyboard focus stays on the selected button.
- [ ] Verify the same fixture with JavaScript disabled: both cards and their links remain visible. Fixtures are test-owned content created and removed by the test harness, never part of the real published portfolio.
- [ ] Run the targeted browser cases and type check. Confirm filtering does not change URLs or require a server endpoint.

## Task 5: Verify the full site and prepare GitHub Pages

**Consumes:** Completed local site, content checks, page routes, browser suite.

**Produces:** Documented local authoring flow and a deployment workflow ready for an actual GitHub repository.

- [ ] Configure Playwright for a local production preview with 1280px, 768px, and 375px viewports. Use browser accessibility locators and screenshots; do not read build-output files. Include a keyboard skip-link check and an overflow assertion:

```ts
expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
```

- [ ] Add isolated temporary content fixtures to exercise production with published and draft entries. Assert drafts are absent from lists and filters and their detail URLs return 404. Add a Markdown image and internal link fixture to validate the rehype URL rewriting in the browser. Clean up only exact test-owned paths using the fixture teardown.
- [ ] Verify both root and repository-path configurations. Commands:

```sh
npm test
npm run check
npm run build
npm run test:e2e
SITE_BASE=/JoeHosmanSite/ npm run build
SITE_BASE=/JoeHosmanSite/ npm run test:e2e
```

- [ ] Set the preview server and test base URL from the same `SITE_BASE` environment variable. Repeat tests only when changes, failures, or unresolved issues require it. Return the final local preview to root configuration for easy review.
- [ ] Write `.github/workflows/deploy.yml` using the official Astro/GitHub Pages workflow documented at execution time. Run `npm ci`, tests, type check, and build in the build job; deploy only through a dependent job. Use Node 24, the Pages configure action's base-path/origin outputs, least-required job permissions, and deployment concurrency. Trigger on the chosen branch (default `main`) and manual dispatch. Document changing the branch before enabling the workflow.
- [ ] Update `CONTENT_GUIDE.md` to reflect working commands and draft behavior. Add `README.md` with `npm ci`, `npm run dev`, `npm run check`, `npm test`, `npm run build`, `npm run preview`, GitHub Pages setup, `SITE_BASE` and optional `SITE_URL`, and image/link conventions. Explain that public-directory images are public even when referenced only by draft content.
- [ ] Record final checks and concrete missing deployment inputs. Do not push or claim public deployment without a repository. Ask for source career/project content when populating the actual portfolio; do not use mockup stories as fact.

## Plan review and execution

This is one connected website, so implement in the task order above. Native execution is recommended: the shell and content model are closely related, and the site does not need several independent implementation agents. A final independent review can check the completed change if the user selects that workflow.

The user has selected Astro. Written-plan review and execution-method selection are the next step under the planning skill. No application code has been scaffolded by this plan.
