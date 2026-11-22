# Portfolio refresh — Nov 2026

Living plan. Source of truth: `Dhruv_Mundada_Resume.pdf` (Nov 2026). Where it
conflicts with `content/`, the resume wins. Where `content/` holds sourced facts the
resume omits, they stay unless they conflict.

## Parameters — every lens this refresh must cover

1. **Fact parity** — every resume bullet, number, date and skill is on the site.
2. **Conflicts** — every place site and resume disagree, resolved toward the resume.
3. **Positioning, engineer lens** — reads as AI Engineer + Backend Engineer, AI first.
4. **Positioning, business lens** — sells AI integration and AI/backend automation
   into operations, not generic "software".
5. **Structural gaps** — facts with no home (achievements, ratings, hackathons).
6. **Voice rules** — `docs/VOICE.md` register, bold rules, never-publish list.
7. **Visual design** — techy, sharp, still simple; no rejected patterns
   (`docs/DECISIONS.md`: no chatbot, no fake terminal, no CRT).
8. **Structure kept** — same lenses, same section ids, same URLs, static export.
9. **SEO/metadata** — JSON-LD `jobTitle`, description, résumé link stay true.
10. **Accessibility/perf** — contrast in both themes, reduced motion, no client JS.

## Gap audit — resume vs site

| # | Item | Site today | Resume | Action |
|---|---|---|---|---|
| G1 | Sessions service | "Building and owning", present tense, no scale | "Designed and shipped… **5M+ users**" | Rewrite to resume, past tense, add 5M+ |
| G2 | Session agent | "~70% of all AI queries", token cut 30% | "sub-agent… **distributed multi-agent architecture** (LangGraph, FastAPI, SQS, Redis, Qdrant)… **70%+ of AI queries received by the company**" | Rewrite to resume framing; keep zero-invented-links |
| G3 | Security hardening | Only in read-more body | Full bullet: internal-only routes, authz, **DNS SRV discovery** | New bullet |
| G4 | Slow endpoint | QC filters "15–17s to under 200ms" | "**~8s to ~300ms**", debouncing + lazy loading | **CONFLICT — Q1** |
| G5 | FastAPI RCA | matches | matches | Wording tidy only |
| G6 | Intern Docker | "3GB" | "3000MB" | Use resume units |
| G7 | BillTrackr | 5 bullets, split metrics | 3 bullets, "civil engineering consultancies" | Collapse to resume's 3 |
| G8 | Skills | AI/LLM third; extras (Spring Boot, Locust, Maven, Actions, Next.js) | AI/LLM second; no extras | AI/LLM first; keep sourced extras |
| G9 | Achievements | none (shelved, `DECISIONS.md`) | Codeforces Specialist 1400+, CodeChef 3★ 1700+, 5th/250+ APOGEE'24 BITS Pilani, 5th/100+ Genathon | Add as rows under EDUCATION, per the shelved decision |
| G10 | Estoria | no attendance | "**5,000+ attendees**", three major events | Add to beyond/leadership point |
| G11 | Engineer tagline | "Backend and AI engineer…" | — | "AI and backend engineer…", AI first |
| G12 | Business lens | 4 services, AI third | — | AI integration + automation lead |
| G13 | Résumé link | Drive file, unknown version | new PDF | **Q2** |
| G14 | Habuild SDE bullet count | 6 | 5 | Max 6 kept; resume 5 lead, 1 extra (payment verification) |

## Design plan

**Content (no code).**
- Experience: resume bullets lead, in resume order, re-cut to `VOICE.md` register.
  Site-only bullets that do not conflict move below or into the read-more body.
  Stack chips add SQS, ECS.
- Achievements: rows appended to EDUCATION in `ProfileSection` — the path
  `DECISIONS.md` already chose. Needs one small schema + component change (G9).
- Engineer tagline: AI first. His own `identity.tagline` untouched.
- Business lens services rewritten in visitor-question voice, reordered:
  1. "Want AI doing real work in your operations?" — assistants on your own
     knowledge, document/image reads with checks, human-in-the-loop on money.
  2. "Want the busywork to run itself?" — AI + backend automations: triggers,
     scheduled jobs, tool-to-tool sync, reports.
  3. "Need a product built from scratch?" — unchanged substance.
  4. "Is it slow exactly when you are busiest?" — unchanged substance.
  Business tagline: AI and automation into the work a business already does.

**UI (same structure, sharper).**
- Hero gets a **proof strip**: up to 4 stat tiles per lens, from a new optional
  `highlights: [{ value, label }]` in each audience JSON — data, not code.
  Engineer: 70%+ AI queries handled · 18M req/week · p95 −45% · 5M+ users.
  Business: 55 min → 7 min · 800+ projects · 150+ invoices/month · 70%+ queries on AI.
- Hero gets a **now line** with the existing beacon dot, derived from the
  `current: true` experience record — no new field.
- Name gets accent treatment (engineer: amber glow + blinking block cursor after the
  mono name, CSS-only, killed by reduced-motion; business: serif, accent underline).
- Rows: hover lift + accent left rule on experience/services/products; stack chips
  as bordered mono pills; section headings get an index (`01 /`) in mono.
- No client JS added. Tokens stay in `globals.css`; contrast checked both themes.

**Tradeoff taken:** proof strip duplicates numbers already in experience. Worth it —
the 15-second scan is the whole reader model, and the strip is the scan.
**Rejected:** animated typing hero (forced delay), separate achievements section
(`DECISIONS.md` already said rows under EDUCATION), case-study pages per service
(new section kind for no new facts).

**What could break:** YAML traps (`:` / leading `**`), schema `max(6)` on points,
audience schema change failing build if a lens omits the field (made optional),
favicon/canonical untouched.

## Implementation plan

| Step | Files | Verifies |
|---|---|---|
| 1. Experience rewrite (G1–G7, G14) | `content/experience/*.md` | build passes; read against resume line by line |
| 2. Skills, beyond, taglines (G8, G10, G11) | `skills.json`, `beyond/02-leadership.md`, `audiences/engineer.json` | build |
| 3. Business lens (G12) | `services/*.md`, `audiences/business.json`, `products/billtrackr.md` | build; VOICE services rules |
| 4. Achievements rows (G9) | `content/achievements.json`, `schema.ts`, `loader.ts`, `ProfileSection.tsx` | build; rows render under EDUCATION |
| 5. Hero proof strip + now line | `schema.ts`, `Home.tsx`, `Home.module.css`, both audience JSONs | build, eslint, render both lenses |
| 6. Visual pass | `globals.css`, `Section.module.css`, `Shell.module.css` | render both lenses, mobile width, reduced motion |
| 7. Docs | `AGENTS.md`, `docs/CONTENT.md`, `docs/VOICE.md`, `docs/DECISIONS.md` | each new field/rule documented |
| 8. Checks + review | — | `npm run build`, eslint, markdown check; `senior-code-reviewer` |

Rollback: each step its own commit on `content/portfolio-rewrite`; revert one.

## Open questions

- **Q1** — Resume "~8s to ~300ms, debouncing, lazy loading" vs site "15–17s to under
  200ms on a partitioned table". Same work or two different endpoints?
- **Q2** — Résumé button: keep Drive link (you re-upload the new PDF to the same
  file), or ship the PDF in `public/` and link it directly?
- **Q3** — Drop the "cut tokens per call 30% (2,253 to 1,584)" figure? Not on the
  resume; sourced from you, so kept by default.

## Log

- 2026-11-22 — audit done, plan written, awaiting approval.
- 2026-11-22 — answers: Q1 résumé wins (~8s to ~300ms; QC filters bullet dropped),
  Q2 keep Drive link, Q3 token-cut point dropped. New rule: no company-internal
  words, general wording as on the résumé. All steps 1–8 done; build, eslint and
  markdown check pass. Visual check NOT done — browser extension not connected.
  Section index (`01 /`) skipped: SectionFrame does not know its position; the
  engineer lens gets a `//` marker instead.
