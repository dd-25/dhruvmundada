---
title: Two databases, one write, and no queue allowed
source: Habuild
kind: work
date: 2026-08
current: true
order: 1
audiences: ["*"]
points:
  - "Learned the standard answers for keeping two stores in step — transactional outbox, saga with compensation, change data capture off the write-ahead log, and a single-owner transaction with a projection write — and that each one buys consistency with a different currency: latency, complexity, or coupling."
  - Eventual consistency is a product decision before it is an engineering one. A latency budget that forbids a queue removes outbox, saga and CDC in a single stroke, and the remaining option is not a preference.
  - Replication lag means written and readable are two different moments, so a read-after-write against a secondary can miss what was just committed.
---

The four patterns, and what each is actually for:

**Transactional outbox** — write the row and an event in one local transaction,
ship the event separately. Durable, and asynchronous by definition.

**Saga** — perform each step for real, and register a compensating step that undoes
it. Built for long-running work across services that cannot share a transaction.

**Change data capture** — read the database's own write-ahead log and project it
outward, with nothing in the application aware it is happening. Kafka Connect is
this with the plumbing already written.

**Single-owner transaction plus projection** — commit to the source of truth and
write the projection inside the same bounded operation, with a repair path for
anything that cannot share the transaction boundary.

None of them is the best one. Writing to two stores is a consistency problem
whether or not anyone calls it distributed, and the constraint you are handed —
latency, ordering, who owns the data — is what picks the pattern. Worth going
looking for the races on purpose, too: the ones a design conversation surfaces
are far cheaper than the ones production does.
