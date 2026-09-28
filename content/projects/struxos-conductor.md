---
title: "StruxOs and Conductor: an experiment in hands-off development"
summary: "Exploring how far Codex and Claude could take a product using goals, transcript-based scenarios, and a continuous refinement harness."
date: "2026"
categories: [agentic-development, software, process-automation]
status: paused
featured: true
draft: false
cover: ""
cover_alt: ""
---

## How far could the agents take it?

At the beginning of 2026, I set Codex and Claude an ambitious challenge: build an
industry-leading project management tool with as little direction from me as
possible. I used goal-driven sessions, including `/goals`, and introduced
YouTube shop-tour transcripts as situations the product should handle.

The result was **StruxOs**, a construction and prefab-workflow prototype, and
**Conductor**, a harness for coordinating continued agent work. The experiment
is paused. The original ambition frames the investigation; it is not a claim
that the prototype became an industry leader.

## Read the case study

1. [What I built](/projects/struxos-conductor/product/) — the application,
   its shop-to-field operating path, and the orchestration harness.
2. [How the experiment progressed](/projects/struxos-conductor/development/) —
   the retained development history, feedback loops, and my interventions.
3. [From shop tours to executable checks](/projects/struxos-conductor/validation/) —
   four concrete transcript-to-rule examples, recorded test results, and a
   saved browser evidence card.
4. [The token footprint](/projects/struxos-conductor/tokens/) —
   11.59 billion observed Codex tokens after removing replayed history,
   the role of cached input, and the missing Claude usage records.
5. [Evidence and open questions](/projects/struxos-conductor/evidence/) —
   source notes, limits of the validation, and what a real operator pilot
   would still need to establish.

## What the evidence supports

The application implements rules around fabrication release, material readiness,
station work, quality, and receiving. Retained sessions include successful
automated checks of specific rules. Later scenarios combine API actions with
browser assertions of saved results.

That is evidence of working parts of a prototype. It does not establish that a
shop could adopt the whole system without help: no completed external shop
pilot was found in the reviewed records. The case study separates what was
implemented, what was tested, and what remains unproven.

The token audit likewise separates observation from inference. **96.39% of the
recorded Codex input was cached context**, and matching Claude usage logs were
unavailable. The token count is neither unique generated content nor a complete
bill for the experiment.
