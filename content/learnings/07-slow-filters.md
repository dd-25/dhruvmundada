---
title: The best fix was deleting the query
source: Habuild
kind: work
date: 2026-06
order: 7
audiences: ["*"]
points:
  - Before tuning a slow query, check whether it needs to run at all. A value already fixed in code does not have to be derived from the database.
  - Finding it took far longer than fixing it. That ratio is the normal one, and it is why reaching straight for optimisation is the wrong first move.
---

A filters page was spending seventeen seconds asking a partitioned table to
produce a list the repository already held as constants. No index and no rewrite
would have helped, because the fastest version of that query is still slower than
not running it.

Worth asking in order every time: does this need to run at all, then does it need
to run here, and only then how fast can it go.
