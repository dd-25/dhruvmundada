---
title: Semantic search kept finding almost the right thing
source: Habuild
kind: work
date: 2026-07
order: 4
audiences: ["*"]
points:
  - Nearest-neighbour over embeddings ranks by similarity, which is not the same as ranking by usefulness. Metadata filtering to narrow the candidates, then a reranking model over what survives, is what made the answers usable.
  - HNSW is an approximate index. It buys speed by not guaranteeing it found the exact nearest neighbours, and how much you give up is a setting rather than a given.
  - A vector store has no unique constraint, so the same fact stored twice just becomes two confident results. Duplicate detection has to happen on write.
---

Retrieval reads like a solved problem until you own the knowledge layer behind it.
The embedding step is the easy half; the ranking, the filtering and the write path
are where the answers are actually won or lost.

The general shape holds outside vector databases. An index that trades exactness
for speed is a decision someone made, and it is worth knowing which way it was
tuned before trusting what it returns.
