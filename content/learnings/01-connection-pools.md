---
title: An unpooled client is a leak with a delay fuse
source: Habuild
kind: work
date: 2026-07
current: true
order: 1
tags: [performance, python, production]
audiences: ["*"]
---

Every httpx, asyncpg and Redis client in the service was being created per call.
It works fine until concurrency rises, then sockets pile up faster than they close.
Pooling and timeout-bounding all three, and closing two leaks, took p95 from 209ms
to 115ms, CPU down 55%, and peak memory down 71% — without changing a line of
business logic.

The lesson that generalises: a client object with no explicit lifetime is a
resource you have not decided who owns.
