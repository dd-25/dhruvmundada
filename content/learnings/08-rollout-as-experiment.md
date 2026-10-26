---
title: A percentage rollout is an experiment if you log both sides
source: Habuild
kind: work
date: 2026-10
order: 8
audiences: ["*"]
points:
  - Bucket by hashing a stable key, not by random draw. The same user lands on the same side every time, so nobody flips between old and new behaviour mid-conversation.
  - Emit the same metric on both branches. The traffic that stayed on the old path becomes a same-day control group, which beats comparing against last week.
  - Keep the percentage in config with a short cache. Rolling back is then a write that takes effect in seconds, not a deploy.
---

The first thing to check after switching a gate on is who actually came through
it. A gate that leaks still reports the intended percentage on the dashboard; only
the traffic itself shows the difference.

Fixed test batteries still have a place before launch. After it, a small real
share of traffic answers questions faster than any synthetic suite, as long as both
sides are measured the same way.
