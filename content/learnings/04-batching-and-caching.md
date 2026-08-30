---
title: Batching and caching solve different problems
source: Habuild
kind: work
date: 2026-06
order: 4
audiences: ["*"]
points:
  - "**Batching** trades latency for efficiency. Hold events for a short window, act once on what settled, and a burst of near-identical work collapses into a single unit — fewer calls, and a reader who is not woken repeatedly for one change."
  - "**Caching** trades freshness for speed. It helps when the same answer is read far more often than it changes, and hurts the moment the underlying value moves faster than the expiry."
  - Both need a bound chosen deliberately — a window length for batching, an expiry and an invalidation rule for caching. Without one, batching adds delay nobody asked for and a cache serves answers that stopped being true.
---

The pattern that made this concrete was an upstream firing one event per field
changed, so a single human action arrived as a dozen. Filtering event types could
not fix it, because no single type meant "what the person did". Holding a short
window server-side and sending the settled state once did.

The general shape: when a producer's unit of work is smaller than the consumer's,
the consumer has to do the regrouping. Nobody upstream is going to do it for you.
