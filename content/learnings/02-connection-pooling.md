---
title: A new connection per call is a TCP and TLS handshake per call
source: Habuild
kind: work
date: 2026-07
order: 2
audiences: ["*"]
points:
  - Opening a connection is not free. TCP costs a round trip to establish, TLS costs another one or two plus asymmetric crypto to agree a key — CPU and memory spent before a single byte of the request moves.
  - A pool keeps established connections alive and hands them out, so a hot path pays that setup once instead of on every call. The hotter the caller-callee pair, the larger the saving.
  - "Pooling alone is half of it. Without a timeout a dead connection keeps its slot forever, so every client needs both a pool size and a bound on how long it may wait."
---

The engagement service took webhooks continuously from one upstream, which is
about as hot as a connection gets, and built a fresh client for each one.
Pooling it gave back the handshake time, the CPU spent on encrypt and decrypt,
and the memory held by sockets waiting to close.

Worth knowing where the cost actually sits: the round trips are latency, the key
exchange is CPU, and the sockets are memory. A pool addresses all three, which is
why it usually shows up in a profile as three separate improvements.
