# Adding content

Everything on the site comes from `content/`. Nothing here needs code changes.
Edit a file, commit, push — GitHub Actions rebuilds and deploys.

If a file is malformed the build **fails** and the deploy is skipped, so the
live site stays on the last good version. The error names the file and the
exact field, e.g.

```
content/experience/01-habuild-sde.md
✖ Invalid input: expected string, received undefined
  → at company
```

## Layout

```
content/
  identity.json        name, tagline, deltas, contact details
  audiences/*.json     one file per lens — adds a route and a theme
  experience/*.md      roles
  services/*.md        what you offer (client lens)
  writing/*.md         posts
  projects/*.md        empty for now
  skills.json
  education.json
  socials.json
```

## Adding a role

Create `content/experience/04-something.md`:

```markdown
---
company: Acme
role: Staff Engineer
period: Jan 2027 — present
kind: FULL-TIME
location: Bengaluru, India
url: https://acme.com          # optional, links the company name
current: true                  # the pulsing dot — only ONE per folder
order: 0                       # lower sorts first
audiences: ["*"]               # or ["engineer"] / ["client"]
points:
  - One line on what you owned.
  - "Quote any line containing a colon: YAML reads it as a key otherwise."
stack: [Go, Postgres, Kafka]
---

Anything below the dashes is the deep dive. It renders behind "read more".
Leave it empty and the entry shows "no write-up yet" instead — no dead link.
```

## Adding a post

`content/writing/2026-09-connection-leaks.md`, same shape, with
`title`, `blurb`, `date: YYYY-MM-DD`, optional `tags` and `external`.

## Changing what shows, and in what order

- **Order within a section** — the `order` number. Lower first.
- **Which lens sees a record** — the `audiences` array. `["*"]` means all.
- **Order of sections in the bottom bar** — the `sections` array in
  `content/audiences/<lens>.json`. Reorder it, the bar reorders.
- **Hide something without deleting it** — `status: draft`.

## Adding a new lens

Drop `content/audiences/mentor.json`:

```json
{
  "id": "mentor",
  "label": "mentor",
  "modeLabel": "MENTOR",
  "theme": "dark",
  "nameFont": "mono",
  "tagline": "Optional — overrides identity.tagline for this lens only.",
  "primaryAction": { "label": "book a call", "glyph": "→", "href": "mailto:..." },
  "sections": ["experience", "writing", "contact"],
  "order": 3,
  "default": false
}
```

`/mentor/` and its section pages exist on the next build. Exactly one audience
file may set `default: true` — that one is also served at `/`.

## The one limit

`sections` may only list ids that have a component:
`experience`, `services`, `skills`, `writing`, `contact`.
A new **kind** of section needs a component plus one line in
`src/components/sections/registry.ts`. A new **entry** in an existing section is
a content file and nothing else.
