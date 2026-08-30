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
  - Building and owning a **Go** sessions service end to end, now the company-wide source of truth adopted by the mobile, agents and admin teams — consolidates a system that lived somewhere different for every session type, and holds **MongoDB and Qdrant consistent on every write** under a latency budget that rules out queues.
  - Led the RCA and hardening of a FastAPI engagement service carrying **~18M requests/week** — introduced **HTTP and database connection pooling**, bounded every timeout, and closed two connection leaks. **p95 down 45%** (209ms to 115ms), CPU down 55%, peak memory down 71%.
  - Built the knowledge layer behind the agents service — **metadata-filtered retrieval** over Qdrant, **reranking** over the narrowed candidates, and duplicate detection before write.
  - Shipped screenshot-based payment verification for a production AI assistant using GPT-4.1 vision, matching UTR, payer number and amount behind fail-closed gates — **1,520 interactions in the first 15 hours**, **312 auto-confirmed**, with unclear cases escalated to a human.
  - Rebuilt the QC team's admin tooling so changes could be tested before production — repaired the chat tester, added CSV export and find-and-replace across intents, and cut a slow filters path on a **partitioned table** from **15–17 seconds to under 200ms**.
stack: [Go, Python, FastAPI, MongoDB, PostgreSQL, Qdrant, LangGraph, AWS Lambda]
---

Joined in June, Habuild's peak-load month, on the team behind the AI assistant
for a WhatsApp-first wellness platform. The first task was stopping that
assistant from leaking its own reasoning into replies users could read.

The engagement service came next. It consumes webhooks from Wati so the assistant
stays quiet while a human support agent is already in the conversation. It had no
staging environment and not a single connection pool. Pooling and timeouts went in
alongside DNS SRV-based service discovery, which also took the internal services
off the public internet.

Most of the work since has been sessions. Habuild sells them, and each kind lived
somewhere different, so no service could answer what is running and when. It is
modelled as a calendar: a template materialises into dated sessions, which makes
the schema most of the design. Reprojection runs from a button and from an
EventBridge cron behind Lambda, bounded so a repeat run cannot keep creating
sessions, with community, free and paid links each carrying their own shape.

Go was new: goroutines, wait groups, composition in place of inheritance, and a
project layout unlike the ones before it. The frontend and the migration off the
old scattered system came with it.
