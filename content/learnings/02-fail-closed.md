---
title: An AI feature that touches money must fail closed
source: Habuild
kind: work
date: 2026-08
order: 2
tags: [llm, payments, design]
audiences: ["*"]
---

The payment-verification agent reads a screenshot of a receipt and decides whether
to confirm. A wrong "yes" costs real money; a wrong "no" costs a human thirty
seconds. So the ladder verifies against Razorpay, then the UTR, and only
auto-confirms when both agree — anything ambiguous goes to a person.

1,520 interactions in the first 15 hours, 312 auto-confirmed, zero errors. The
accuracy number was never the point. The asymmetry of the two failure modes was.
