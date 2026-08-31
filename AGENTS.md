<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# dhruvmundada

Personal site. Static export on GitHub Pages at `https://dd-25.github.io/dhruvmundada/`.
Everything above this line is written by `next dev` between its own markers; it
rewrites only that block, so anything down here survives.

## The rule that shapes the codebase

Content is data, not code. Adding a role, a project, a note or a whole new
audience lens is a file under `content/` — never a component. If a change would
make someone edit `src/` to publish content, it is the wrong change.

The one real limit: a new *kind* of section needs a component plus a line in
`src/components/sections/registry.ts`. A new *entry* in an existing kind is a
file and nothing else.

## Layout

```
content/                 the whole site's data
  identity.json          name, tagline, email, resume link
  audiences/*.json       one file per lens — theme, sections, primary action
  experience/*.md        frontmatter + a "read more" body
  learnings/ products/ services/ customers/ beyond/
  skills.json education.json achievements.json socials.json
  skills.json socials.json education.json
src/lib/content/
  schema.ts              zod, single source of truth for content shape
  loader.ts              reads, validates, sorts, memoises
  markdown.ts            remark, build time only
src/components/sections/ one component per section kind + registry.ts
```

## Before changing content

`content/` is not filler — every number in it is a claim about a real career, and a
few things are deliberately absent. **Read `docs/VOICE.md` first.** It carries who
each lens is written for, the done-vs-learnt split, the register each section uses,
and the list of things that must never be published. `docs/CONTENT.md` covers the
mechanics of which file and which field.

The source material is `scratchpad/raw-input.md` (Dhruv's own words) and
`scratchpad/raw-inventory.md` (every fact mapped to where it landed, or why it was
dropped). That directory is **gitignored**, so a fresh clone will not have it. If it
is missing, ask rather than inferring intent from the edited output.

## Non-obvious things

- **Validation is the deploy gate.** A malformed content file fails
  `npm run build`, so CI stops and the live site stays on the last good build.
  Never soften a schema to make a file pass — fix the file.
- **Points carry inline markdown.** `**text**` in a `points:` entry renders as a
  highlight tinted from the lens accent. Rendered in `loader.ts` via
  `renderInline`, so components receive HTML. Each point must be one paragraph.
- **Themes are CSS custom properties** in `src/app/globals.css`, stamped as
  `data-theme` by `Shell`. Two exist: `dark` (engineer) and `light` (business).
  Adding a lens theme means one block there plus the `theme` enum in `schema.ts`.
- **`basePath` is `/dhruvmundada`.** Raw `href`/`src` outside `next/link` and
  `next/image` must go through `assetPath()` in `src/lib/paths.ts`.
- **`public/.nojekyll` is load-bearing.** Without it GitHub Pages drops `_next/`.
- **Tab icons are per lens**, one static SVG each in `public/icons/`, declared
  through `lensIcon()` in every route's `generateMetadata`. The URL must stay
  identical across a lens's pages — a changed href makes the browser drop the icon
  and refetch, which is what a flickering favicon is. `/` uses the default lens's
  icon for the same reason. There is deliberately no `app/icon.svg` or
  `favicon.ico`; either would take precedence and reintroduce the mismatch.
- **The Search Console token in `layout.tsx` is not a leaked secret.** A verification
  token binds a site to one Google account and is worthless to anyone who does not
  already control this repo. It is meant to be served publicly — deleting it un-verifies
  the property.
- **Canonical is set per page and never on the layout.** Next inherits layout
  metadata into every child, so one `alternates` there canonicalises the whole site
  to a single URL and Google drops the rest as duplicates. `layout.tsx` sets none;
  `page.tsx`, `[audience]` and `[audience]/[section]` each set their own. The default
  lens points at `/`, because `/` and `/engineer/` are the same page.
- **Sitemap URLs carry a trailing slash** to match `trailingSlash: true`. Without it
  every entry 301s. The default lens is deliberately absent from the sitemap — it
  canonicalises to `/`, which is already listed. `src/app/sitemap.ts` is the sitemap;
  `robots.ts` points at it. Both are `force-static`, so they ship in the export.
- **Every tab reads just the name.** `layout.tsx` sets an absolute title and no page
  overrides it. Unique per-page titles would be marginally better for search — this
  is a deliberate trade, not an oversight.
- **No client-side state for navigation.** The lens toggle is a pair of links and
  progressive disclosure is native `<details>`. Keep it that way — it is why the
  static export works and why pages render instantly.

## Docs are part of the change

If you alter behaviour, a check, a content rule or a section's shape, update the doc
that describes it **in the same commit** — `AGENTS.md` for architecture and
non-obvious files, `docs/CONTENT.md` for fields and mechanics, `docs/VOICE.md` for
anything about how content reads, `docs/DECISIONS.md` for a choice worth not
re-litigating. A doc that describes the previous version is worse than no doc,
because the next person believes it.

## Checks

```bash
npm run build                                   # includes content validation
npx eslint src --max-warnings=0
npx tsx src/lib/content/markdown.check.mts      # inline renderer assertions
```

`.github/workflows/deploy.yml` runs the same three on every push to `main`, then
publishes `out/` to Pages — so a failing check is a skipped deploy, not a broken
site. It caches `.next/cache` between runs; without that every build is cold
(measured at 19s against 8s warm).

Copy is judged on the rendered page, not in a diff — `npm run dev`, then read it.
