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
highlights:
  - { label: "users served", to: "5M+" }
  - { label: "AI queries handled", to: "70%+" }
  - { label: "p95 latency", from: "209ms", to: "115ms" }
  - { label: "endpoint load", from: "~8s", to: "~300ms" }
points:
  - Designed and shipped a centralized session-management service in **Go** and MongoDB as the single source of truth for the main app and the AI agent layer, with **eligibility-based session delivery** across user cohorts for **5M+ users**.
  - Built a supervisor-routed sub-agent with tool calling and guardrails against fabricated links while migrating a production AI platform to a **distributed multi-agent architecture** (LangGraph, FastAPI, AWS SQS, Redis, Qdrant) — it now handles **70%+ of AI queries** the company receives.
  - Led **security hardening** of a production service after a security incident — moved routes to an internal-only surface, enforced authorization on exposed endpoints, and introduced **DNS SRV-based service discovery**, leaving microservices reachable only from inside the network.
  - Root-caused and hardened a FastAPI service handling **~18M requests/week** — pooled and timeout-bounded every httpx, asyncpg and Redis client and fixed two connection leaks. **p95 down 45%** (209ms to 115ms), CPU down 55%, peak memory down 71%.
  - Diagnosed and fixed a slow production endpoint, cutting load time from **~8s to ~300ms**, and removed redundant front-end API calls with debouncing and lazy loading.
  - Shipped screenshot-based payment verification for a production AI assistant using a vision model, matching transaction reference, payer and amount before confirming — **1,520 interactions in the first 15 hours**, 312 auto-confirmed, with unclear cases escalated to a human.
stack: [Go, Python, FastAPI, LangGraph, MongoDB, PostgreSQL, Qdrant, Redis, AWS SQS, AWS Lambda, Langfuse]
---

Joined the team behind a production AI assistant on a WhatsApp-first platform,
during its busiest month of the year. The first fix was stopping the assistant
from leaking its own reasoning into replies users could read. A webhook-driven
service with no connection pool came next, and then the hardening that took
internal services off the public internet.

Most of the work since has been sessions. Each kind used to live somewhere
different, so no service could answer what is running and when. It is modelled
as a calendar: a template materialises into dated sessions, which makes the schema
most of the design, and a repeat run is bounded so it cannot keep creating them.
Go was new, along with goroutines and composition in place of inheritance.

The agent layer sits on top: retrieval filtered by metadata, reranked, and guarded
against duplicates before anything is written. The sub-agent answers what users
actually ask, went out to a small share of them first, and widened only as each
review round came back cleaner than the last.
