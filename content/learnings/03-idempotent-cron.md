---
title: A job that writes will be run twice
source: Habuild
kind: work
date: 2026-08
order: 3
audiences: ["*"]
points:
  - A job that reads is safe to repeat. A job that writes gets repeated anyway — by a retry, by an overlapping run, by someone pressing the button while it is already going.
  - So two questions before a scheduled writer ships — what bounds the work, and what the second run produces. A rolling horizon answers the first, an idempotent key the second.
---

Neither question is visible in the code that creates one row correctly, which is
why they get answered after the duplicate rows show up rather than before.

Sessions generating forward from a template are the clearest case — capped at a
rolling 45 days, so the job has a point at which it has done enough. Without a
horizon there is no such point, and it keeps going as far as the calendar allows.
