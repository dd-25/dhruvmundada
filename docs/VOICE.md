# Writing for this site

Read this before changing a word under `content/`. `CONTENT.md` covers the
mechanics — which file, which field. This covers what to put in them.

## Who is reading

Two lenses, two different people, one set of facts.

| Lens | Reader | They are deciding |
|---|---|---|
| `engineer` (default) | recruiter, hiring manager, senior engineer | is this person good, and can they grow |
| `business` | founder or owner with a problem | can this person solve it for me |

Fifteen seconds of scanning, then maybe a read. That is why every section is
points first and prose behind `read more`. Never invert it.

## The rule that governs everything

**What was done goes in `content/experience/`. What was learnt goes in
`content/learnings/`. Never both.**

An experience bullet says what shipped and what it moved. A learning says what
generalises, and it must survive the reader knowing nothing about the job. If a
learning is retelling an achievement, it is in the wrong file.

## Never publish

These are not style preferences. Getting one wrong costs Dhruv something real.

- **Work he did not personally do.** He sat near a lot of systems. If he did not
  build it, it does not appear — not as a bullet, not in a body, not in a stack chip.
- **A customer's name without permission**, and never why one left. The customer
  list is a listing, not a case study.
- **A number with no source.** If it is not in `scratchpad/raw-input.md` or a message
  from Dhruv, do not write it. Ask.
- **Anything unflattering about an employer**, including quantified criticism of
  their code.
- **Family sourcing, personal circumstances, or anything he has asked to drop.**
  The inventory records these; check it before re-adding something.

## Register

### Experience points — résumé tone

The pattern, taken from his actual résumé:

```
Verb (past tense) + object + mechanism — em dash — metrics
```

> Led the RCA and hardening of a FastAPI engagement service carrying **~18M requests/week**
> — pooled and timeout-bounded every httpx, asyncpg and Redis client, and closed two
> connection leaks. **p95 down 45%** (209ms to 115ms), CPU **55%**, peak memory **71%**.

- First word is a past-tense verb. `Built`, `Led`, `Cut`, `Shipped`, `Introduced`,
  `Architected`. Never a noun, never present tense.
- One sentence. Metrics may follow as a second fragment.
- **No rationale clauses.** No "so that", no "because", no "which means". Results
  appear as participles — *replacing a manual CRM process*, *removing external exposure*.
- Technology named inline and unglossed. The reader knows what asyncpg is.
- Compressed units: `~18M requests/week`, `150+ invoices/month`, `~17s to ~300ms`.
- **One bullet per project.** Do not split one piece of work across two.
- **No project-specific configuration.** A 45-day horizon, a 30-second batching
  window, a 3–5 day backfill — those are knobs someone set, not achievements. A
  reader cannot evaluate a knob, and it crowds out what they can. Ask what the
  recruiter does with the number: if the answer is nothing, cut it.

  Keep a number when it is an **outcome** — latency, cost, volume, time saved,
  adoption, scale. Cut it when it is a **setting**. The knobs are not lost: they are
  exactly what a learning is for, and every one cut from `experience` already lives
  in `learnings`, where the mechanism is the point.
- **Tense follows reality.** The current role is present participle — *Building and
  owning a Go sessions service*. Everything finished is past tense.
- **Spell the unit on both sides.** `55 minutes to under 7 minutes`, not `~55 minutes
  to under 7`. A reader should never have to infer what the second number counts.
- **Bold by the rule below**, not by feel.
- **Pick the more precise verb.** *escalated to a human*, not routed. *leading and
  organising*, not handling. *solved it*, not sold it. A present-tense fact is held,
  not achieved once — *Hold a black belt*, *Am a state-level medallist*.

### What to highlight

`**text**` renders tinted from the lens accent. It is the scan layer — a reader who
only looks at the bold should still come away with the right impression. Two
questions, and it needs both:

1. **Did Dhruv cause this?**
2. **Would an interviewer ask about it by name?**

**Bold:**

- Outcomes and figures he moved — `p95 down 45%`, `55 minutes to under 7 minutes`,
  `800+ projects`, `95% response accuracy`, `47 students`.
- Named techniques and architectural choices he made — `multi-tenant`,
  `tenant isolation`, `pagination and indexed queries`, `connection pooling`,
  `concurrency-safe`, `reranking`, `partitioned table`, `Go`.
- Credentials that are the claim — `black belt`, `state-level medallist`,
  `gold in a fight event`.

**Never bold:**

- **Behaviour of a system he did not build.** `24–48 hours` is how long YouTube takes
  to publish; it is context for the work, not the work. Highlighting it credits him
  with someone else's constraint.
- **A descriptive phrase that is not a named technique.** `fail-closed gates` reads as
  prose dressed up as a keyword. If nobody would put it on a job description, leave it
  plain.
- **A filler word.** A lone bolded `one` or `two` reads as an accident, not emphasis.
- Anything in a read-more body. Bold belongs in points, where scanning happens.

If a bullet ends up with four bolded fragments, the scan layer is doing nothing —
cut to the one or two that carry the claim.

### Read-more bodies

Where the context goes that would bloat a bullet — why the system existed, what was
hard, what was new. Plain past tense, no headings, three short paragraphs at most.
Avoid "I"; the bodies elsewhere do.

**A body is context, not a specification.** It is the place to say *paid in
instalments over long periods*, not *across three to five years*. Precise ranges
belong in a bullet where they are the claim; in a body they read as a spec sheet and
invite a question the paragraph was not trying to raise.

### Learnings

**These are general engineering lessons, not project retrospectives.** A reader who
knows nothing about the job must be able to use one. If a note only makes sense as
"here is a thing that happened at work", it does not belong — that is what the
experience read-more is for.

- **Teach the mechanism and give the answer.** Not "queries in a loop are slow" but
  *why* (N round trips, each paying network and planning cost) and *what to do
  instead* (one query with `IN` or a join, or a batched write). A reader should
  finish a note knowing something they can apply.
- **Title is the whole bet.** It must make a recruiter want the next two lines.
  `Most slow queries are one of four mistakes` beats `Query optimisation`. State a
  fact or a surprise, never a category.
- One to three points. If a note only justifies one point, merge it with a related
  one. Prefer a few substantial notes to many thin ones.
- Body is the long version and is optional.
- Left column shows date and source automatically, so never write "at Habuild in 2026"
  into the text.

### Services (business lens)

- **No metrics.** Proof lives in `products` and `customers`, one nav item away.
- Headings are questions in the visitor's voice — *"Want to automate daily workflows?"*
- Keep them general. A heading naming one industry loses every other reader.
- Order by what the widest visitor wants first, not by what he is proudest of.
- **Do not overcommit.** No promise of ongoing support, maintenance or availability
  that has not been agreed. *Deployed and handed over working* is a deliverable;
  *keeps running after release* is a retainer nobody signed.

### Products and customers (business lens)

- **No tech stack.** A prospect is buying an outcome; the stack belongs on the
  engineer lens.
- **No funnel numbers.** "Pitched 8, demoed 6, closed 3" makes the reader ask why five
  said no. State what is live and what it carries.

### Profile

The last section on both lenses, and it doubles as contact — there is no separate
contact section. Education first, then achievements when `achievements.json` has any,
then how to reach him.

**Every row is a key on the left and a value on the right**, using the same
`meta` / `body` grid as experience — `EMAIL`, `WHATSAPP`, `ELSEWHERE`, `BASED`, and
`EDUCATION` beside its period. Do not collapse these into a bulleted list. The label
column is what makes the section scannable, and it is the layout used everywhere else
on the site.

Education values use `strongInline`, not `heading`. Three qualifications stacked at
heading size read as three jobs rather than three schools.

Email is filtered out of the social list because it has its own line — `socials.json`
carries an `email` entry whose label is the address, and rendering both printed it
twice.

### Beyond

Name the institution where it buys credibility — *at Vibrant Academy, Chhatrapati
Sambhajinagar*. Do not date things that do not need dating; *during the third year of
college* is enough, and a month range reads like a CV nobody asked for.

Titles are a short noun phrase, not a bare category and not a sentence — `Teaching
mathematics`, `Campus and school leadership`, `Sport and discipline`. The second
half of the title is doing work; `Sport` alone says less than `Sport and discipline`.

Points use the **same verb-first past tense as experience** — *Won gold in kumite…*,
*Served as school Head Boy…*, *Played for the school cricket team…*. Beyond is not a
softer register, it is the same register applied to different material.

Group; do not list. Eight separate achievements read as a childhood résumé and make
the engineering look smaller. Three grouped entries each make a point.

### Contact

Each line says what the channel is for and what to send, in one sentence. No sales
language, no "let's build something amazing", no exclamation marks. The tone is a
person telling you the fastest way to reach them.

## Two habits worth copying

Both came out of a later editing pass and are now the house style:

- **Generalise the vivid detail.** "when the input is messy and the answer has
  consequences" beats "when the input is a blurry screenshot and the answer costs
  money". The specific version is more fun to write and excludes every reader whose
  problem looks slightly different.
- **Close a body on an understated general line, and refuse the jargon.** *"It trains
  follow-through without needing to call it a framework."* The observation lands
  because it declines the word it could have reached for.

## Section titles are not section ids

`ServicesSection` renders `WHAT I DO`; `CustomersSection` renders `WHO SAID YES`. The
id (`services`, `customers`) is the URL and the nav label and stays a clean lowercase
word. The display title in the component can be warmer. Renaming an id changes a URL.

## YAML traps that have already bitten

Each of these failed a build. The validator catches them, which is the point — but
know them:

- A point containing `:` must be quoted. YAML reads it as a key.
- A point starting with `**` must be quoted. YAML reads a leading `*` as an alias.
- `since: 2026` parses as a number. Quote it when the field wants a string.

## Identity and taglines

`identity.tagline` is **his own wording and is not yours to improve.** It comes from
his GitHub profile and About section, and it is what search engines show. The same
goes for anything else that states who he is rather than what he did.

Each audience file may override it with a lens tagline, and those *are* editorial.
A lens tagline is the first line under his name, so it has one job: say what he does
for the person reading, in one sentence that is still true next year.

- **Not a stack list.** "Go services, FastAPI systems, RAG, WhatsApp automation" is
  the skills section with commas. It dates the moment the stack moves, and it makes a
  senior reader wonder why the tools are the headline.
- **Not one customer's problem.** "spreadsheet-heavy workflows" describes civil
  engineering consultancies. Every visitor whose problem looks different reads it and
  leaves. Same mistake as a service heading naming one industry.
- **Say the outcome, not the activity.** *makes systems faster, cheaper, and harder to
  get wrong* is a claim someone can want. *does backend development* is a job title.

## The source material

`scratchpad/raw-input.md` holds Dhruv's own words verbatim, and
`scratchpad/raw-inventory.md` maps every fact to where it landed or why it was
dropped. **`scratchpad/` is gitignored**, so on a fresh clone it will not be there.
If it is missing, do not reconstruct intent from `content/` — that is the edited
output and cannot tell you what was deliberately left out. Ask Dhruv.

## Before you say it is done

```bash
npm run build                                   # content validation is the deploy gate
npx eslint src --max-warnings=0
npx tsx src/lib/content/markdown.check.mts
```

Then read the actual page. Copy is judged at size, in the theme, not in a diff.
