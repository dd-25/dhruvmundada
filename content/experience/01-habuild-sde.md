---
company: Habuild
role: Software Development Engineer I
period: Jun 2026 — present
kind: FULL-TIME
location: Bengaluru, India
current: true
order: 1
audiences: ["*"]
points:
  - Led the RCA and hardening of a FastAPI engagement service carrying ~18M requests/week — pooled and timeout-bounded every httpx, asyncpg and Redis client, and closed two connection leaks.
  - Cut p95 latency 45% (209ms to 115ms), CPU 55%, and peak memory 71%.
  - Shipped screenshot-based payment verification for a production AI support agent using GPT-4.1 vision, with a three-tier Razorpay/UTR ladder and fail-closed gates — 1,520 interactions in the first 15 hours, 312 auto-confirmed, zero errors, replacing a manual CRM process.
  - Traced a slow production endpoint from ~17s to ~300ms and removed redundant front-end calls with debouncing and lazy loading.
  - Introduced DNS SRV-based service discovery, removing external exposure of internal microservices.
stack: [Python, FastAPI, PostgreSQL, Redis, LangGraph, AWS SQS, Qdrant, Langfuse]
---
