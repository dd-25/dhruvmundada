---
company: Habuild
role: Software Development Engineer I
period: Jun 2026 — present
kind: FULL-TIME
location: Bengaluru, India
url: https://habuild.in/
current: true
order: 1
audiences: ["*"]
points:
  - Building and owning a **Go** sessions platform, now the single source of truth for every paid, free and community session and read by the app, the AI agents and the admin console — replaced **8,064 pre-created rows per event** with **rule-based eligibility at read time**, and kept the legacy stores in step through two-way sync instead of a cutover.
  - Built a supervisor-routed session agent in **LangGraph** for the session questions that make up **~70% of all AI queries** — seven read-only tools and a guard that rejects any link not returned by a tool in the same turn. Rolling out from 10% of members with **zero invented links** in production, and cut tokens per call 30% (2,253 to 1,584).
  - Led the RCA and hardening of a FastAPI engagement service carrying **~18M requests/week** — introduced **HTTP and database connection pooling**, bounded every timeout, and closed two connection leaks. **p95 down 45%** (209ms to 115ms), CPU down 55%, peak memory down 71%.
  - Built the session knowledge layer behind the agents service — **metadata-filtered hybrid retrieval** over Qdrant, **reranking** over the narrowed candidates, near-duplicate detection before write, and re-embedding skipped for unchanged entries.
  - Shipped screenshot-based payment verification for a production AI assistant using GPT-4.1 vision, matching UTR, payer number and amount behind fail-closed gates — **1,520 interactions in the first 15 hours**, **312 auto-confirmed**, with unclear cases escalated to a human.
  - Rebuilt the QC team's admin tooling so changes could be tested before production — repaired the chat tester, added CSV export and find-and-replace across intents, and cut a slow filters path on a **partitioned table** from **15–17 seconds to under 200ms**.
stack: [Go, Python, FastAPI, MongoDB, PostgreSQL, Redis, Qdrant, LangGraph, Langfuse, AWS Lambda]
---

Joined in June, Habuild's peak-load month, on the team behind the AI assistant
for a WhatsApp-first wellness platform. The first task was stopping that
assistant from leaking its own reasoning into replies users could read. The
engagement service came next: no staging environment and not a single connection
pool. Pooling and timeouts went in alongside DNS SRV-based service discovery,
which also took the internal services off the public internet.

Most of the work since has been sessions. Habuild sells them, and each kind lived
somewhere different, so no service could answer what is running and when. It is
modelled as a calendar: a template materialises into dated sessions, which makes
the schema most of the design. Eligibility is evaluated per member at read time
rather than stored per row, a nightly job keeps the calendar filled ahead, and the
old stores are written back after every commit until nothing reads them. Go was
new, and so was owning the frontend that came with it.

The session agent sits on top of that platform and answers what members actually
ask: where to join, where the recording is, what runs tomorrow. It went out to a
small share of members first, with everyone else kept as a same-day comparison,
and widened only as each QC round came back cleaner than the last.
