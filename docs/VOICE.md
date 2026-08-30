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
- Wrap the number that matters in `**`. It renders tinted from the lens accent.

### Read-more bodies

Where the context goes that would bloat a bullet — why the system existed, what was
hard, what was new. Plain past tense, no headings, three short paragraphs at most.
Avoid "I"; the bodies elsewhere do.

### Learnings

- **Title is the whole bet.** It must make a recruiter want the next two lines.
  `The best fix was deleting the query` beats `Query optimisation`. State a fact or
  a surprise, never a category.
- One to three points. If a note only justifies one point, it is probably not a
  learning — merge it with a related one.
- Body is the long version and is optional.
- Left column shows date and source automatically, so never write "at Habuild in 2026"
  into the text.

### Services (business lens)

- **No metrics.** Proof lives in `products` and `customers`, one nav item away.
- Headings are questions in the visitor's voice — *"Want to automate daily workflows?"*
- Keep them general. A heading naming one industry loses every other reader.
- Order by what the widest visitor wants first, not by what he is proudest of.

### Beyond

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
