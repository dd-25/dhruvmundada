---
company: BillTrackr
role: Software Engineer (Independent)
period: Feb 2026 — Jun 2026
kind: INDEPENDENT
location: India
url: https://billtrackr.in
order: 2
audiences: ["engineer"]
points:
  - Built a B2B SaaS platform replacing scattered Excel billing for engineering consultancies — onboarded **3 clients** running **800+ projects** and **150+ invoices/month**.
  - Cut bill update and generation from **55 minutes to under 7 minutes** with project-linked invoices, receipt tracking, deductions, and exports.
  - Architected a **multi-tenant** backend with strict tenant isolation, **role-based access control**, and tiered subscriptions with real-time feature gating.
  - Made invoice numbering **concurrency-safe** under contention, and kept project and invoice lists responsive with **pagination and indexed queries**.
  - Built real-time analytics dashboards and automated invoice generation with PDF and Excel export.
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
