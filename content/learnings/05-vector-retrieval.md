---
title: Similar is not the same as relevant
source: Habuild
kind: work
date: 2026-07
order: 5
audiences: ["*"]
points:
  - Nearest-neighbour search over embeddings ranks by similarity, which is not the same as ranking by usefulness. Narrow with metadata filters first, then rerank what survives with a model that scores the query against the document directly.
  - "**HNSW** is an approximate index — it trades exactness for speed, so it can miss a true nearest neighbour, and how much it misses is a parameter you set rather than a property you inherit."
  - A vector store has no unique constraint, so the same fact written twice becomes two confident results and doubles its own weight in retrieval. Deduplicate on write, not on read.
---

The embedding step is the easy half. Ranking, filtering and the write path are
where retrieval quality is actually won or lost, and none of them are visible in
a demo that only ever sees clean questions.

The general point survives outside vector databases. An index that trades
exactness for speed is a decision somebody made, and it is worth knowing which
way it was tuned before trusting what comes back.
