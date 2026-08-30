---
title: Most slow queries are one of four mistakes
source: Habuild
kind: work
date: 2026-06
order: 3
audiences: ["*"]
points:
  - "**Querying in a loop.** N rows becomes N round trips, each paying network and planning cost. Fetch the set in one query with `IN` or a join, or batch the writes — one statement with many rows beats many statements with one."
  - "**Not asking whether the query is needed.** A value fixed in code does not have to be derived from the database. The fastest query is the one that never runs, and that check costs nothing to make first."
  - "**Reaching for `DISTINCT` or a join without knowing the cost.** `DISTINCT` makes the database sort or hash the whole result to drop duplicates; a join multiplies rows before filtering them. Both are fine on small, indexed sets and expensive across a partitioned table, where a predicate without the partition key reads every partition."
---

The fourth mistake is starting with the query at all. Read the plan before the
SQL — it tells you what is actually being touched, which is often not what the
statement appears to ask for.

The order worth keeping: does this need to run, then does it need to run here,
then how many times does it run, and only then how fast can the statement itself
be made.
