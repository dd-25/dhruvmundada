---
title: A rule in the prompt is a request, not a guarantee
source: Habuild
kind: work
date: 2026-10
order: 6
audiences: ["*"]
points:
  - Anything an agent must never get wrong belongs in code. Whether a member has already been asked something is state, so it lives in the graph, not in a sentence asking the model to remember.
  - "\"Never say X\" lists make X more likely, because naming the thing primes it. A positive rule and one worked example steer better than a list of prohibitions."
  - Check the output, not the intent. A link in a reply is valid only if a tool returned it in the same turn — a model can alter a real URL as easily as invent one, and only a check on the text catches both.
---

The prompt still matters; it is where tone and judgement live. The split worth
keeping is that the prompt decides what to say and the code decides what is
allowed to be said.

Shorter prompts helped as much as stricter ones. Each tool described in one line,
and one tool per kind of question, left the model fewer near-identical choices to
confuse — and cost fewer tokens on every call.
