# Decisions and rejected options

What is settled and why, so nobody re-litigates it. For how the site works now read
`../AGENTS.md`; for how to write for it read `VOICE.md`.

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

## Search

The goal is narrow and worth stating, because it stops the scope creeping: **a search
for "Dhruv Mundada" should return this site.** Not "backend developer", not
"FastAPI consultant" — those are head terms owned by sites with years of links.

| Decision | Why |
|---|---|
| Verified via the `<meta>` tag, not a file in `public/` | Next has `metadata.verification`, so it is one line and no stray file. The token is not a secret either way; both methods are public by design. |
| Canonical per page, never on the layout | Layout metadata is inherited, so one canonical there tells Google all 16 pages are duplicates of the home page. This shipped broken and indexed one URL out of twelve. |
| Sitemap URLs end in a slash | `trailingSlash: true` makes every page a directory index. Without the slash every entry is a 301 and gets reported as a redirect. |
| Default lens omitted from the sitemap | `/` and `/engineer/` are the same page; `/engineer/` canonicalises to `/`. Submitting both submits a known duplicate. |
| `Person` JSON-LD with `sameAs`, `alumniOf`, `worksFor` | A name query is an entity-matching problem. The structured record is what lets Google decide this Dhruv Mundada is the one with that GitHub and that LinkedIn, rather than a namesake. |
| One title, `Dhruv Mundada`, on every page | Unique titles would help slightly. His call, and the trade is defensible: the page that should rank for the name is `/`, and the name is the whole title there. |

**The two biggest levers are not in this repo.** A custom domain (`dd-25.github.io` is
a shared domain and the site is a subdirectory on it) and reciprocal links from the
GitHub and LinkedIn profiles, which is what makes `sameAs` two-way and believable.

## Rejected, with reason

- **Astro** — better fit technically, lost to the user's explicit learning goal. Their call.
- **Runtime `fetch('/data/*.json')`** — no SEO on own writing, blank flash, bad data breaks live site silently.
- **contentlayer** — unmaintained.
- **LLM chatbot ("ask me anything about Dhruv")** — no server on GH Pages so the key ships in the bundle; hallucinates about the user's career in front of a hiring manager; recruiters scan, they don't chat; done to death.
- **Fake terminal prompt (type `help`)** — hides content behind commands. 15-second recruiter types nothing and leaves.
- **Retro CRT / boot sequence / scanlines** — equally done; boot animation is a forced delay before content.
- **README aesthetic** — just rendered markdown, no visual identity, badges read junior.

## Settled later, during the content rewrite

| Decision | Why |
|---|---|
| Teaching lives in `beyond`, not `experience` | The experience timeline should read as engineering progression. Teaching between two tech roles makes a reader re-parse it. |
| `projects` renamed `products` | Everything listed is something a visitor can go and use. A prospect wants products. |
| `clients` renamed `customers`, heading `WHO SAID YES` | A subscriber bought a product; nobody hired a service. `users` would drop the fact that they paid. |
| `contact` became `profile` | Education and how to reach him are one block about the person. A separate contact section for three lines was not worth a nav slot. |
| No achievements block for now | Built once and shelved — there was nothing real to put in it, and an empty heading is worse than no heading. If it comes back, the rows continue EDUCATION rather than opening a section: a rating and a qualification are the same kind of thing to a reader. |
| Learnings are general lessons, not project retrospectives | A reader should be able to use one without knowing the job it came from. |
| No conversion or funnel numbers | "Pitched 8, closed 3" invites "why did five say no". |
| No tech stack on the business lens | Prospects buy an outcome. The stack is on the engineer lens. |
| The `writing` section kind was removed | No content, no lens listed it. Re-add is a component plus one registry line. |

## Never revisited without asking

- Naming a customer, or saying why one stopped using something.
- Any claim about work Dhruv did not personally build.
- A number that is not in `scratchpad/raw-input.md` or a message from him.
- His tagline. It is his own wording from his GitHub profile; do not "improve" it.
