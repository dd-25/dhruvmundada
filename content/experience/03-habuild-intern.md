---
company: Habuild
role: Engineering Intern
period: Jun 2025 — Nov 2025
kind: INTERNSHIP
location: Nagpur, India
url: https://habuild.in/
order: 3
audiences: ["*"]
highlights:
  - { label: "RAG accuracy", to: "95%" }
  - { label: "expert workload", to: "−80%" }
  - { label: "Docker image", from: "3000MB", to: "220MB" }
  - { label: "build time", from: "9 min", to: "2.5 min" }
points:
  - Developed a **RAG** proof of concept for query resolution using semantic and hybrid search over a curated knowledge base — **95% response accuracy**, cutting expert workload by **80%**.
  - Optimized Docker builds, cutting image size from **3000MB to 220MB** and build time from **9 minutes to 2.5 minutes**.
  - Prototyped a **LangGraph** supervisor-and-subagent architecture to replace a production assistant's monolithic prompt, lowering per-request cost and making each new capability a new subagent — later taken to production.
  - Built a ticket-tracker-to-WhatsApp status bridge that gave a support team without board access live visibility of their tickets, batching webhook bursts server-side so one update sent one notification instead of a dozen.
  - Built an analytics pipeline from the YouTube API into BigQuery on Lambda and an EventBridge cron, backfilling on every run so late-published figures still land correctly.
  - Introduced GitHub Actions CI running the suite on every push, wrote the tests it needed, and built a Locust workbench measuring p95 and p99.
stack: [Python, TypeScript, NestJS, LangGraph, RAG, Docker, AWS Lambda, BigQuery]
---

Six months, seven projects, no two alike.

It opened with stripping log lines out of a few NestJS services — a log is an I/O
call, and I/O is a line on the bill. The analytics pipeline had a wrinkle before
any of the numbers mattered: the source names followed no single convention, so
matching them took pattern rules rather than a lookup.

The build work paid off longest, and the reason it worked is worth keeping. Docker
caches per step and discards every layer after the first one that changed, so the
order of a Dockerfile is a performance decision.
