# Joe Hosman's portfolio

A career-first editorial site built with Astro. Markdown holds the content;
GitHub Pages serves the generated website. The design uses an identity sidebar,
career stories, and selected projects across software, engineering, and art.

## Local development

Use Node 24 or later:

```sh
npm ci
npm run dev
```

Open the local address Astro prints, normally `http://localhost:4321/`.
Development shows draft entries with a visible label. Copy a file from
`templates/` to start a new entry.

If Astro starts a background server, manage it with `npx astro dev status`,
`npx astro dev logs`, and `npx astro dev stop`.

## Content

See [the content guide](CONTENT_GUIDE.md) for the full workflow.

- `content/career/`: one Markdown file per role.
- `content/projects/`: one Markdown file per project or experiment.
- `content/about.md`: the About page.
- `src/config/site.ts`: your name, tagline, site description, and public profile/contact links.
- `src/pages/index.astro`: the homepage introduction.
- `templates/`: copyable entry templates.
- `public/images/`: project photos and other publishable images.

Career appears first on the homepage. Each collection shows up to three featured
entries, or its newest entries if none are featured. Dates break ties by filename.
Content defaults to draft if the `draft` setting is omitted. Only `draft: false`
entries get published. Replace template prompts with your own content before
publishing.

## Verify and preview publication

```sh
npm test
npm run check
npm run build
npm run preview
```

The production preview excludes drafts. The career section contains six roles
from 2006–2026, adapted from Joe's master resume. The project section includes
home-improvement builds, lake-water irrigation, and freight-bidding workflow
automation delivered through Hosman Solutions LLC.

Browser tests use isolated test-site copies, never your real content. On a local
machine they use installed Google Chrome. CI uses Playwright Chromium:

```sh
npm run test:e2e
E2E_EMPTY=1 npm run test:e2e
SITE_BASE=/JoeHosmanSite/ npm run test:e2e
```

If Chrome is unavailable locally, install Chromium with
`npx playwright install chromium`, then run `CI=1 npm run test:e2e`.

## GitHub Pages

Repository: [JoeHosman/JoeHosmanSite](https://github.com/JoeHosman/JoeHosmanSite).
GitHub Pages is configured to use **GitHub Actions**.
The site address is **https://joe.hosman.org/**.

Push changes to `main` or run **Build and deploy portfolio** from Actions.
Commit source files and `package-lock.json`, not generated files or dependencies.
This repository is public: draft Markdown remains visible in GitHub even though
draft entries are excluded from the published website.

The workflow tests, checks, builds, and deploys only after successful verification.
It discovers the site's origin and repository path from GitHub Pages. No token
needs to be stored in the repository. A failed build leaves the previous site up.

To reproduce a repository-path build locally:

```sh
SITE_BASE=/JoeHosmanSite/ SITE_URL=https://joehosman.github.io npm run build
SITE_BASE=/JoeHosmanSite/ npm run preview
```

`SITE_URL` is optional locally; configured sites use it for canonical and social metadata.
`SITE_BASE` defaults to `/`. Markdown image/link paths such as `/images/a.jpg`
and `/career/` receive the base automatically. Use the same base for build and
preview. Leave external URLs and fragment links unchanged.

The implementation follows the [approved design](docs/superpowers/specs/2026-09-27-editorial-portfolio-design.md).

## Custom domain: joe.hosman.org

The intended address is **https://joe.hosman.org**. `public/CNAME` records that
hostname, but does not configure DNS or GitHub Pages by itself. For an Actions
deployment, set the custom domain in the repository's Pages settings.

GoDaddy is the registrar; Cloudflare hosts the DNS for `hosman.org`.

When the site is ready to go live:

1. In GitHub **Settings → Pages → Custom domain**, enter `joe.hosman.org` and save.
2. In Cloudflare, select **hosman.org → DNS → Records → Add record**:

   | Type | Name | Target | Proxy status | TTL |
   | --- | --- | --- | --- | --- |
   | CNAME | `joe` | `joehosman.github.io` | DNS only (gray cloud) | Auto |

   The value is a hostname, with no `https://` or repository path.
   Use DNS only so visitors connect directly to GitHub Pages and GitHub handles
   the HTTPS certificate. No GoDaddy DNS changes are needed.
3. Rerun the deployment workflow after setting the custom domain. It picks up
   the custom origin and `/` base path from GitHub's Pages configuration.
4. Once GitHub's DNS check and certificate provisioning finish, enable
   **Enforce HTTPS**, then verify the home, career, project, and image URLs.

Check for an existing `joe` DNS record before changing it. The apex domain and
mail records do not need to change for this subdomain setup. No DNS records
have been modified by the local implementation.

References: [GitHub custom-domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
and [Cloudflare DNS record instructions](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).
