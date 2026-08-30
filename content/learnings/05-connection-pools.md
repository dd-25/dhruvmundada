---
title: Every call was opening its own connection
source: Habuild
kind: work
date: 2026-07
order: 5
audiences: ["*"]
points:
  - A client built per call behaves perfectly until concurrency rises, then sockets accumulate faster than they close. It never appears in testing, because testing is never concurrent enough.
  - Pooling is only half of it. Without a timeout, one dead connection sits in the pool holding a slot forever, so every client needs both.
---

A client object with no explicit lifetime is a resource nobody has decided who
owns. That is the whole failure in one sentence, and it applies equally to HTTP
clients, database connections and cache handles.

The fix changes no business logic at all, which is the part worth remembering. The
service was doing identical work either way — it was simply paying for a new socket
each time instead of reusing one.
