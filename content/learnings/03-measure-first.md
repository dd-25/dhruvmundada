---
title: The slow thing is almost never the thing you suspect
source: Habuild
kind: work
date: 2026-07
order: 3
tags: [debugging, performance]
audiences: ["*"]
---

An endpoint took ~17 seconds. The instinct was to blame the query. It was not the
query. Reading the actual path end to end got it to ~300ms, and the front end was
separately firing redundant calls that debouncing and lazy loading removed.

Profile before you optimise, and read the whole path, not the part you already
understand.
