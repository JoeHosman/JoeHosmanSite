# Joe Hosman: career-first editorial portfolio

## Intent and agreed direction

Create an easy-to-maintain personal website showcasing Joe's thirty years of
industry experience alongside experiments and projects in process automation,
machine learning, software, woodworking, mechanical engineering, and art.
Serve potential employers and clients as well as fellow builders and
collaborators. Joe selected the Editorial Profile layout and explicitly chose
career first. Content is maintained through Markdown files and images, with
GitHub as the host.

The visual reference is option 01 in `design-previews/visual-directions.html`.
Its sample project names and illustrations are design examples, not biographical
evidence or production content.

## Visual design and homepage

Use warm off-white paper, a pale sage identity column, dark olive text, muted
rust accents, serif display headings, and restrained sans-serif supporting
text. Use Georgia and system sans-serif fonts initially. Avoid decorative
animation. Favor readable stories and understated separators.

Desktop uses an approximately 240px identity sidebar beside the main reading
column, within a centered maximum-width shell. Sidebar content includes Joe's
name, a short introduction, and Home, Career, Projects, and About navigation.
The sidebar may stick within the viewport when it fits without cutting off
navigation. At narrow widths it becomes a compact header with wrapping links;
content becomes a single column.

Homepage order:

1. Short introduction grounded in the stated thirty years of experience and
   range of interests. Keep the selected mockup's editorial headline treatment.
2. Career highlights: up to three published, featured roles with company, title,
   dates, summary, and links to the full career entries. Link to all experience.
3. Selected projects: up to three published, featured projects, each with an
   optional image, title, category labels, summary, and detail-page link.
4. Brief About invitation and configured public profile or contact links.

When no featured entries exist, show up to three latest published entries of
that type. If a collection has no published entries, omit its homepage list;
its index has a short empty-state message. Never manufacture roles or projects
to fill the layout.

## Pages and navigation

| Route | Purpose |
| --- | --- |
| `/` | Career-first introduction, career highlights, selected projects. |
| `/career/` | All published roles, newest start date first. |
| `/career/<slug>/` | Role metadata and the Markdown career story. |
| `/projects/` | All published projects, newest date first, category filters. |
| `/projects/<slug>/` | Project metadata, optional cover, Markdown story and images. |
| `/about/` | Editable personal introduction and available contact/profile links. |
| `/404.html` | Useful not-found page with links back to the main sections. |

Project filters use categories derived from published entries. Include an All
option, allow one selected category at a time, and preserve access to the full
list when JavaScript is unavailable. Categories overlap; a project appears for
every category assigned to it. Use filename-derived stable slugs. Resolve date
ties by slug for deterministic ordering.

## Content and publishing contract

Preserve the current contracts in `templates/project.md`, `templates/career.md`,
and `CONTENT_GUIDE.md`. Projects live in `content/projects/`, roles in
`content/career/`, and images in `public/images/`. Add `content/about.md` for the
About body and a small central site configuration for name, introduction,
public URLs, and deployment URL/base path.

Validate required fields and allowed project status values at build time.
Accept career dates as quoted years or year-months and retain that display
precision; an empty end date means Present. Reject invalid months, invalid
calendar dates, and end dates clearly before start dates. Require meaningful
cover alt text when a cover is supplied. Empty covers produce text-only entries.

`draft: true` excludes an entry from production routes, indexes, filters, and
homepage selections. Local development can expose draft entries with a visible
Draft label. Draft status is a publishing control, not secrecy: files in a
public GitHub repository remain publicly readable. Only publishable media
belongs in the public image directory.

Templates and illustrative samples stay outside published collections. The
initial implementation can demonstrate detailed layouts through local draft
examples clearly labeled as samples. Real employers, dates, achievements, and
project claims require Joe's source content. Do not infer them from mockups.

## Technical approach

Use Astro in static-output mode, content collections for validation and page
generation, shared layout components, and plain CSS. Keep JavaScript limited
to project filtering and any necessary small progressive enhancements.
No database, application server, or browser-based CMS is required.

Keep content loading/filtering/sorting separate from page presentation. Share
an editorial shell, career summary component, project summary component, and
Markdown typography rules. Both listing pages and detail pages consume the same
validated content. Invalid content fails the build with the source path rather
than silently disappearing.

Use GitHub Actions to build and deploy the static output to GitHub Pages on
pushes to the configured deployment branch. The GitHub repository, branch, and
final URL are deployment inputs to establish from the eventual repository;
they do not block building the site locally. Support both a root-hosted site
and a repository subpath through configuration. All internal links and image
URLs, including root-relative references inside Markdown, respect that base.

Astro documents static GitHub Pages deployment and schema-backed content:

- https://docs.astro.build/en/guides/deploy/github/
- https://docs.astro.build/en/guides/content-collections/

## Accessibility and verification

Use semantic landmarks, one page-level heading, logical heading hierarchy,
visible keyboard focus, a skip link, readable contrast, meaningful image alt
text, and reduced-motion support. Long prose has a comfortable reading width;
images scale to the column and code blocks scroll without widening the page.

Verify the production build and inspect desktop and mobile layouts at 1280px,
768px, and 375px. Exercise navigation, project category filtering, detail pages,
empty collections, missing optional images, and keyboard use. Check that a
production build excludes drafts and sample content. Verify links and media in
both `/` and a representative repository base-path build. Validate malformed
metadata failure and date ordering with focused checks. A failed build must
prevent the deployment job from running.

## Initial delivery boundary

Deliver a working local site, templates and an updated authoring guide, content
validation, and a GitHub Pages workflow. Actual public deployment requires a
configured repository and real publication-ready content. Custom domains,
analytics, search, contact forms, and a separate blog are future additions.

## Review status

Layout and career-first priority selected by Joe. This written specification
is ready for review before the implementation plan is created. The workspace
is not currently a Git repository, so this document is saved locally.
