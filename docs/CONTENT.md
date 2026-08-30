# Adding content

This is the mechanics — which file, which field. For what to actually write in them,
read `VOICE.md` first.

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
  identity.json        name, tagline, contact details, resume link
  audiences/*.json     one file per lens — adds a route and a theme
  experience/*.md      roles
  learnings/*.md       short notes on what something taught you
  beyond/*.md          things outside the job — teaching, sport, a channel
  services/*.md        what you offer (client lens)
  products/*.md        things people can go and use
  customers/*.md       who used them (names need permission)
  skills.json
  education.json      shown under PROFILE — `level` is the left-column key
  achievements.json   shown under PROFILE, empty until there is something
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
  - Cut checkout latency **62%** (1.4s to 530ms) by batching three sequential calls.
  - "Quote any line containing a colon: YAML reads it as a key otherwise."
  - "**Quote a line starting with `**` too** — YAML reads a leading `*` as an alias."
stack: [Go, Postgres, Kafka]
---

Anything below the dashes is the deep dive. It renders behind "read more".
Leave it empty and the entry shows "no write-up yet" instead — no dead link.
```

### Marking what matters in a point

Wrap the part worth seeing in `**`. It renders highlighted — amber on the
engineer lens, green on business, taken from that lens's accent colour.

```yaml
points:
  - Cut p95 latency **45%** (209ms to 115ms), CPU **55%**, and peak memory **71%**.
```

This is the whole skim layer, so spend it. A recruiter reads the highlights
and nothing else, and a point with four of them has none. Mark the number or
the outcome, leave the explanation plain. A point with nothing worth marking
is fine unmarked.

Also available inside a point: `` `code` `` and `[links](https://example.com)`.
Each point must stay one paragraph — a blank line inside one fails the build
with the file named.

## Adding a learning

`content/learnings/08-something.md`. A note is a curious title, up to three
points, and an optional long version:

```markdown
---
title: The dashboard was wrong and nothing had broken
source: Habuild          # optional — the company or project it came from
kind: work               # or "general" for something learnt outside work
date: 2025-09            # YYYY-MM, renders as "Sep 2025"
order: 5
audiences: ["*"]
points:                  # 1 to 3. This is the whole note at a glance.
  - The API holds a day's numbers back for **24 to 48 hours**.
  - Re-reading the last 3 to 5 days on every run fixed it.
---

Below the dashes is optional. When present it renders behind "the long version";
when empty the note is just its points, with no dead link.
```

The left column shows `date` and `source` — "Sep 2025 / Habuild" — so the note
itself never has to repeat when or where.

## Adding an achievement

`content/achievements.json`. Competition results, ratings, ranks — anything that is a
credential rather than a job or a hobby. Renders under PROFILE, above contact.

```json
[
  {
    "title": "Specialist on Codeforces",
    "note": "peak rating 1400",
    "url": "https://codeforces.com/profile/<handle>",
    "order": 1
  },
  { "title": "Winner, <hackathon name>", "note": "out of 120 teams", "year": "2025", "order": 2 }
]
```

`title` is required; `note`, `year` and `url` are optional. The block does not render
while the file is an empty array, so there is never an empty heading.

Rule of thumb for where something goes: a **credential** (rating, rank, prize) is an
achievement; a **sustained activity** (sport, teaching, a club) is `beyond/`; a **job**
is `experience/`.

## Adding something to BEYOND

`content/beyond/03-something.md`. Same shape as a learning, minus the date:

```markdown
---
title: Karate, boxing and kickboxing
period: Dec 2025 - Mar 2026   # optional. Omit and the row drops its left column
url: https://example.com      # optional, links the title
order: 2
audiences: ["*"]
points:
  - Up to three. One is fine.
---
```

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
  "sections": ["experience", "learnings", "profile"],
  "order": 3,
  "default": false
}
```

`/mentor/` and its section pages exist on the next build. Exactly one audience
file may set `default: true` — that one is also served at `/`.

## The one limit

`sections` may only list ids that have a component:
`experience`, `learnings`, `products`, `services`, `customers`, `skills`,
`beyond`, `profile`. A lens may list at most five.
A new **kind** of section needs a component plus one line in
`src/components/sections/registry.ts`. A new **entry** in an existing section is
a content file and nothing else.
