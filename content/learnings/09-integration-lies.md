---
title: Two systems, two different ideas of what an event is
source: Habuild
kind: work
date: 2025-09
order: 9
audiences: ["*"]
points:
  - ClickUp fires a webhook per field change, so one submission of our form fanned out to about a dozen — a count set by how many fields we had, not by anything fixed. Batching a 30-second window and sending the settled state once turned a dozen WhatsApp messages back into one.
  - YouTube publishes analytics 24 to 48 hours after the fact, so a forward-only run recorded a day while its numbers were still incomplete and never came back for the rest. Pulling a three to five day backfill alongside each run fixed it.
  - Neither system was misbehaving. Both had a definition of "an event" and of "now" that did not match the one I had assumed.
---

Two integrations, one quarter apart, same root cause. I had taken the other
system's model of the world for granted instead of going to find out what it
was.

Before consuming anything you do not control, ask two questions: what does it
count as one event, and how long before its data is final. Both answers are
usually documented, and both are cheaper to read than to discover.
