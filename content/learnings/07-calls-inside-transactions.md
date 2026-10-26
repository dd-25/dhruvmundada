---
title: Never wait on another service while holding a lock
source: Habuild
kind: work
date: 2026-10
order: 7
audiences: ["*"]
points:
  - A network call inside a database transaction holds its locks for as long as the other service takes. If that service calls back and touches the same rows, both sides wait on each other until a timeout ends it.
  - Commit first, then write to the other system, and treat a failed side write as something to log and repair. Two-way sync also needs an origin marker on every write, or each side keeps echoing the other's change back.
  - "Nested timeouts must shrink inward: the innermost call has to give up before the one wrapping it does. Check the budget when the service boots, not when it is first exceeded in production."
---

The deadlock is easy to write and hard to see in review, because each half is
reasonable on its own. One service saves inside a transaction and notifies another;
the other, reasonably, reads back to confirm. Neither change is wrong. The pair is.

Moving the side write after commit gives up atomicity across the two systems, and
that is the honest trade. A short window where one side lags, with a repair path,
is cheaper than a lock held across someone else's outage.
