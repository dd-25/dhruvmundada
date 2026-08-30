---
title: A wrong yes costs money, a wrong no costs thirty seconds
source: Habuild
kind: work
date: 2026-06
order: 6
audiences: ["*"]
points:
  - The assistant reads a screenshot of a payment and decides whether to confirm it.
  - It checks Razorpay, then the UTR, payer number and amount, and auto-confirms only when the evidence agrees. Anything unclear goes to a human.
  - "**1,520 interactions in the first 15 hours**, **312 auto-confirmed**, and no reported false confirmations."
---

The two failure modes are not the same size, so the system should not treat them
the same way. Everyone asks how accurate the model is. That was never the
question — the question was which way it should be wrong when it is unsure.

Anything that touches money gets built to fail closed. It hands doubt to a
person instead of guessing.
