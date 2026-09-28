# Updating your site content

Copy a template, write your entry, preview it, and mark it ready to publish.
The site builds career pages, project listings, and category filters from your
Markdown files. Push changes to `main` to run the GitHub Pages deployment
workflow. See `README.md` for repository and hosting details.

Run `npm run dev` to preview your work locally, including drafts. Before
publication, run `npm run check` and `npm run build`. Invalid metadata reports
the entry that needs attention and stops the build.

## Add a project

1. Copy `templates/project.md` to `content/projects/your-project-name.md`.
2. Fill in the settings between the two `---` lines at the top. Keep those lines.
3. Replace the prompts with your story. Delete any sections you do not need.
4. Put images in `public/images/projects/your-project-name/`.
5. Preview the entry with `npm run dev`, then set `draft: false`
   when it is ready for publication.
6. Commit the Markdown file and its images to GitHub.

Use lowercase filenames with hyphens, such as `oak-side-table.md`. One file
represents one project, whether it is a finished piece or an ongoing experiment.

### Project settings

| Field | How to use it |
| --- | --- |
| `title` | Project name, in quotes. |
| `summary` | A short description for project listings, in quotes. |
| `date` | The year or date you want displayed: `"2025"` or `"2025-06-15"`. Quote year-only values. |
| `categories` | One or more categories from the list below. |
| `status` | `idea`, `in-progress`, `completed`, or `paused`. |
| `featured` | Set to `true` to nominate the project for the homepage. |
| `draft` | Keep `true` while writing; `false` means ready to publish. |
| `cover` | Image path, such as `/images/projects/oak-side-table/cover.jpg`, or `""` for none. |
| `cover_alt` | A required description when a cover is supplied, or `""` when there is no cover. |

Start with these categories: `process-automation`, `machine-learning`,
`software`, `woodworking`, `mechanical-engineering`, `home-improvement`, and `art`. A project can
belong to several categories:

```yaml
categories:
  - woodworking
  - art
```

Use spaces, not tabs, for indentation. For text containing double quotes, use
single quotes around the value, for example `title: 'The "Workshop" experiment'`.

For a project spanning several years, use its completion year (or latest year
worked on) for `date`, and describe the full time span in the story. A year-only
value displays only the year; sorting places it at the beginning of that year.

## Add a career entry

Copy `templates/career.md` to `content/career/company-role.md`. Fill in the
company, role, summary, and dates, then write the relevant experience below.
Use one file per role so multiple roles at the same company can stand alone.

Dates can be `"2020"` or `"2020-01"`, depending on the precision you know. Keep
them in quotes. Leave `end: ""` for a current role. Set `featured: true` for an
experience you want highlighted and `draft: false` when it is ready to publish.
Delete optional sections rather than filling them with unnecessary text.

## Basic Markdown

```markdown
## A section heading

A normal paragraph with **bold text** or *emphasis*.

- A list item
- Another item

[A descriptive link](https://example.com)

![A description of the image](/images/projects/project-name/photo.jpg)
```

Image files live under `public/images/`, but content references start with
`/images/`. The renderer applies the site's configured base URL so those paths
also work on GitHub Pages project sites. Link to other entries with paths such
as `/career/company-role/` or `/projects/project-name/`. Keep filenames stable:
renaming a Markdown file changes its page URL. Compress large photographs before
adding them; public images are served as supplied.

Small entries are welcome. A paragraph and a photo can be enough; longer
projects can include process notes, galleries, code samples, and lessons.

## Choose what appears on the homepage

Career appears first, then projects. Mark entries with `featured: true` to
highlight them. Each section shows at most three, newest first. If none are
featured, it uses the newest published entries. Career sorts by start date;
projects sort by their displayed date. Equal dates sort by filename.

## Drafts and examples

`draft: true` entries appear only in local development. Production builds omit
their detail pages, links, and category filters. `npm run build` followed by
`npm run preview` shows the published view. The content directories contain real
career and project entries. Use `templates/career.md` or `templates/project.md`
to add another.

Drafts are not a privacy mechanism: a public repository exposes its source
files, and everything in `public/` is copied to the published site regardless
of draft status. Keep private notes and private media outside the repository.

## About and contact links

Edit `content/about.md` for your About page. Public links live in the `links`
array in `src/config/site.ts`, for example:

```ts
links: [
  { label: 'GitHub', url: 'https://github.com/YOUR_USERNAME' },
  { label: 'Email', url: 'mailto:YOUR_PUBLIC_EMAIL' },
]
```

Replace those example values with your actual public details. An empty array
keeps the contact links hidden.

## Edit the StruxOs case study

The project overview is `content/projects/struxos-conductor.md`. Its five linked
chapters live in `content/case-studies/struxos/`, with this metadata:

```yaml
---
title: "What I built"
description: "A short introduction to this chapter."
order: 1
---
```

Edit the Markdown beneath the metadata as usual. The chapter filename determines
its URL under `/projects/struxos-conductor/`; `order` controls the chapter menu
and previous/next links. These chapters are published directly and have no
`draft` switch. They do not appear as separate projects in the project listing.
Update the overview links and the chapter-count browser test if adding chapters.
Keep raw development sessions and detailed token manifests outside public content.
