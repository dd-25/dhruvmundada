# Portfolio site — design state

> **Historical.** Written before any code existed ("Nothing built yet"). Kept for the
> rejected-options record, which still explains why the site is shaped this way. For
> how it actually works now, read `../AGENTS.md`, `CONTENT.md` and `VOICE.md`.

Carried over from the `mei` session. Nothing built yet. Design approved through
architecture; UI direction pending final yes.

## Locked

| Decision | Value | Why |
|---|---|---|
| Framework | Next.js App Router, `output: 'export'` | User wants to learn Next. Static export required for GitHub Pages. |
| Hosting | GitHub Pages, repo `dd-25/dhruvmundada` | Live at `https://dd-25.github.io/dhruvmundada`. Name is in the URL. |
| basePath | `/dhruvmundada` | Project repo, not root repo. |
| Images | `images.unoptimized: true` | Mandatory under `output: 'export'`. Compress before committing. |
| `public/.nojekyll` | required | Without it GitHub drops `/_next/`, site loads blank. |
| Content source | `content/` dir, build-time read | Push a file, CI rebuilds. No runtime fetch. |
| Content format | JSON for structured records, Markdown + frontmatter for prose | Prose in JSON becomes one escaped string; user stops writing. |
| Validation | Zod at build | Bad file fails CI, deploy skipped, live site untouched. Blast radius zero. |
| Audiences | one static route per audience, generated from `content/audiences/*.json` | Add a JSON file, get a new route. No code. |
| Domain | none for now | Buy later; removing basePath is one config line. |

## Rejected, with reason

- **Astro** — better fit technically, lost to the user's explicit learning goal. Their call.
- **Runtime `fetch('/data/*.json')`** — no SEO on own writing, blank flash, bad data breaks live site silently.
- **contentlayer** — unmaintained.
- **LLM chatbot ("ask me anything about Dhruv")** — no server on GH Pages so the key ships in the bundle; hallucinates about the user's career in front of a hiring manager; recruiters scan, they don't chat; done to death.
- **Fake terminal prompt (type `help`)** — hides content behind commands. 15-second recruiter types nothing and leaves.
- **Retro CRT / boot sequence / scanlines** — equally done; boot animation is a forced delay before content.
- **README aesthetic** — just rendered markdown, no visual identity, badges read junior.

## Architecture

```
content/
  identity.json          name, headline, bios (short/long), photo, location, availability
  audiences/*.json       the priority control — see below
  experience/*.json      company, role, period, type, ownership, impact[], stack[], logo
  projects/*.md          frontmatter meta + writeup body
  learnings/*.md         frontmatter meta + post body
  skills.json            grouped; each entry links evidence (project/role slug)
  services.json          client offerings, engagement model
  testimonials.json      quote, author, role, company
  socials.json
  speaking.json
  now.json               current focus, availability, dated
public/
  .nojekyll
  resume.pdf
  images/
src/
  lib/content/{schema.ts, loader.ts, markdown.ts}
  components/sections/   + registry.ts
  components/ui/
  app/
    page.tsx             default audience
    [audience]/page.tsx  generateStaticParams from content/audiences/
    learnings/page.tsx
    learnings/[slug]/page.tsx
    projects/[slug]/page.tsx
next.config.ts
.github/workflows/deploy.yml
```

### Priority schema

Every record carries:

```
order: number            low first
featured: boolean
audiences: string[]      which lenses show it; ["*"] = all
status: "draft" | "published"
summary: string          the short version (see short/full toggle)
```

Audience file controls section order — this is the priority lever:

```jsonc
// content/audiences/client.json
{
  "id": "client",
  "label": "Client work",
  "question": "Looking for someone to build it?",
  "brief": "Short paragraph the page opens with.",
  "sections": ["services", "testimonials", "projects", "experience", "contact"],
  "labels": { "experience": "ENGAGEMENTS" },   // per-audience vocabulary
  "order": 2,
  "default": false
}
```

Reorder the `sections` array, push, done. Section id with no entry in
`components/sections/registry.ts` fails the build.

**Honest limit:** new *entries* in an existing section = data only. A new *section type*
= one component + one registry line. No architecture avoids that.

### Failure model

Zod parse on every file at build. Bad field / missing required / unknown audience id /
dangling evidence slug → build throws with file path and field name → CI fails →
deploy skipped → last good version stays live.

## UI direction — proposed, awaiting final yes

Concept: **the site is the user's assistant, briefing whoever walked in.** The user is
the principal, never the assistant — that distinction protects founder/EM positioning.

Chosen artifact: **the man page.** Not a terminal emulator. A typographic document.

```
DHRUV(1)                    Personal Manual                    DHRUV(1)

NAME         dhruv — builds products, leads the people who build them
SYNOPSIS     dhruv [--hire] [--client] [--peer]
DESCRIPTION  positioning paragraph
OPTIONS      skills, grouped
EXAMPLES     projects, each as a worked example
BUGS         what he is still bad at        <- credibility, almost nobody does this
SEE ALSO     socials
AUTHOR                                          Last updated 2026-08
```

Why it holds up:
- A man page *is* a briefing. Merges with the assistant concept instead of competing.
- Man page sections are numbered by audience by real Unix convention (1 = user commands,
  3 = library calls, 8 = sysadmin). `dhruv(1)` client, `dhruv(3)` peer, `dhruv(8)` hiring.
  The audience switcher gets a convention nobody has to explain.
- Zero typing, nothing hidden. Scrollable document, scannable in 15 seconds.

Supporting artifacts, each scoped to one section:
- **htop** for `/now` — running processes = active projects with % allocation, uptime =
  years shipping, load average = how booked. One section only; wears thin past the fold.
- **changelog** for the experience timeline — career as semver, pivots as
  `BREAKING CHANGE`, learnings as `### Learned`.

Design language (this is what keeps it from reading junior):
- Mono for structure (headers, labels, tables). Real text face for prose.
- Paper-and-ink or muted dark. **Not green-on-black.** Typographic, not skeuomorphic.
- No typing, no fake prompt, no boot animation, no scanlines.
- `⌘K` search optional, phase 2, over a prebuilt static index. Never required.

Known risk: `man` is insider, a non-technical client may not get it. Mitigation is the
`labels` field above — `/client` renders `SERVICES`, `/peer` renders `SYNOPSIS`. Same
structure, different vocabulary, one JSON field.

## Content checklist

identity · experience · projects · learnings · skills (each with evidence link) ·
services · testimonials · socials · speaking/writing · now · education/certs ·
`resume.pdf`

Pushback standing: a skill claim with no evidence link gets cut; the client lens is weak
without 2-3 real testimonials.

## Open

1. Final yes on the man-page direction.
2. Mockup before spec, or straight to spec?
3. Years of experience, number of companies.
4. Primary goal: job, clients, or reputation. Changes which audience is `default: true`.
5. Testimonials — longest lead time, blocks the client lens.

## Next step

On approval: write the spec to `docs/superpowers/specs/YYYY-MM-DD-portfolio-design.md`,
then the implementation plan. No code before that.
