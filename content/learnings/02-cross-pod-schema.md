---
title: Three teams had to agree before I could write the schema
source: Habuild
kind: work
date: 2026-08
order: 2
audiences: ["*"]
points:
  - A schema shared across services is a contract, not a data structure. It is quick to write and expensive to change, because changing it means migrating every team that has already built against it.
  - The cheapest place to find a contradiction between two teams' needs is a conversation, and the most expensive is a migration.
  - Learned to stack pull requests when work runs ahead of review — each opened against the branch below it, so a diff stays small enough to argue with instead of large enough to be approved unread.
---

The mobile team, the agents service and the admin panel all needed sessions, and
each already had its own idea of what a session was. Reconciling those into one
shape was most of the design work, and none of it looked like code at the time.

What generalises is where the leverage sits. Almost anything is cheap to change
while it is still a proposal, and the moment a second team depends on it the price
goes up by an order of magnitude and never comes back down.
