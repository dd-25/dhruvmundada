---
company: BillTrackr
role: Software Engineer (Independent)
period: Feb 2026 — Jun 2026
kind: INDEPENDENT
location: India
url: https://billtrackr.in
order: 2
audiences: ["engineer"]
highlights:
  - { label: "billing cycle", from: "55 min", to: "<7 min" }
  - { label: "projects", to: "800+" }
  - { label: "invoices/month", to: "150+" }
  - { label: "clients", to: "3" }
points:
  - Engineered a B2B SaaS platform replacing error-prone Excel and manual billing for civil engineering consultancies — onboarded **3 clients** managing **800+ projects** and **150+ invoices/month**, cutting bill update and generation from **~55 minutes to under 7 minutes**.
  - Built real-time analytics dashboards and automated invoice generation with **concurrency-safe** sequencing and PDF and Excel exports, giving project-level financial tracking that holds up under concurrent workloads.
  - Architected a secure **multi-tenant** backend with strict data isolation and **role-based access control**, with tiered subscriptions, real-time feature gating and automated lifecycle management.
stack: [TypeScript, Node.js, PostgreSQL, Prisma, React.js]
---

Civil engineering consultancies are paid in instalments over long periods, so the
domain object is not only an invoice. It is an outstanding
amount with a history, deductions, receipts, and a date somebody has to chase.
That is what made the schema the interesting part. Everything downstream, the
dashboards and the exports, is a view over it.

Two things were harder than they looked. Invoice numbers must be gapless and unique
per tenant, which is a sequence under contention rather than a counter. And a
consultancy with hundreds of live projects turns every unpaginated list into a slow
page eventually, so the lists were paginated and index-backed from the start rather
than after the first complaint.
