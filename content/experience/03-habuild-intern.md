---
company: Habuild
role: Engineering Intern
period: Jun 2025 — Nov 2025
kind: INTERNSHIP
location: Nagpur, India
url: https://habuild.in/
order: 3
audiences: ["*"]
points:
  - Built a ClickUp-to-WhatsApp status bridge that gave a support team without board access live visibility of their tickets — batched webhook bursts server-side, cutting a dozen duplicate notifications per update down to **one**.
  - Built a RAG proof of concept for query resolution over a curated knowledge base using semantic and hybrid search — **95% response accuracy**, **80% less expert workload**.
  - Prototyped a LangGraph supervisor-and-subagent architecture to replace a production assistant's monolithic prompt, lowering per-request cost and making each new capability a new subagent — taken to production by another team.
  - Built a YouTube Analytics to BigQuery pipeline on Lambda and an EventBridge cron, backfilling on every run so figures YouTube publishes **24–48 hours** late still land correctly.
  - Cut Docker image size from **3GB to 220MB** and build time from **9 minutes to 2.5**.
  - Introduced GitHub Actions CI running the suite on every push, wrote the tests it needed, and built a Locust workbench measuring p95 and p99.
stack: [TypeScript, NestJS, Python, LangGraph, RAG, Docker, AWS Lambda, BigQuery]
---

Six months, seven projects, no two alike.

It opened with stripping log lines out of a few NestJS services — a log is an I/O
call, and I/O is a line on the bill. The YouTube pipeline had a wrinkle before any
of the analytics mattered: six sessions run a day under names that follow no single
convention, so matching them took regex against the source listing rather than a
lookup.

The build work paid off longest, and the reason it worked is worth keeping. Docker
caches per step and discards every layer after the first one that changed, so the
order of a Dockerfile is a performance decision.
