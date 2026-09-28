---
title: "How the experiment progressed"
description: "From a small architecture experiment to a scenario-driven product, with autonomous work and human course corrections."
order: 2
---

## The ambition and the recorded history

I began exploring the idea in early 2026. The repository history available for
this review begins on May 23, and the retained development records extend into
July. Those are different statements: my recollection establishes the broader
starting point; the repository and session logs establish the dated development
events discussed here.

| Period | What the records show | What that establishes |
| --- | --- | --- |
| May 23–24 | Clean Architecture scaffold, identity administration, tests, company/project context, .NET 10, TypeScript, and initial fabrication/logistics work. | A concrete application foundation, not just a specification. |
| Late May | Repeated architecture reviews, actor-specific browser audits, seeded users, and a goal to make the system usable in a prefab shop. | The work expanded from adding features to testing whether roles could use them. |
| June | Shop-tour-derived requirements, more operational rules, and the Conductor design dated June 20. | External descriptions of shop work and an execution harness shaped the backlog. |
| June 27–30 | Pilot-readiness slices, workflow test runs, repeated gap audits, and a catalog of situation scripts. | Validation became more executable, while test results continued to uncover gaps. |
| July 5–6 | UI compaction, terminology changes, regression cleanup, and a durable screenshot-gallery script. | Development was still correcting usability and verification problems near the end of the reviewed history. |

The project is now paused. The timeline describes historical work, not a current
service-level promise or a completed customer rollout.

## Hands-off was the question, not the entire history

The sessions do not support a story in which I gave one prompt and never
intervened again. They show requests to resume goals, inspect the running app,
seed users for different roles, rerun Playwright, investigate failures, and fix
the gaps those checks found.

In late June, I asked for a catalog of situation scripts, then for those scripts
to be played through and their remaining product gaps addressed. Later goals
called for API-backed demonstrations to become browser demonstrations with
actor-facing screens.

The autonomy was inside a directed process: the agents could investigate,
implement, test, and continue work across many steps, while I adjusted the goal
and the standard of proof. That is a more useful account of the experiment than
equating long agent runs with the absence of human direction.

## Why validation had to change

An early actor audit could pass while using mocked responses. A workflow script
could prove backend transitions by calling APIs without proving that a shop
worker could find the same actions in the interface. A green component test
could confirm expected labels while the live application still had confusing
navigation or empty state.

The development history shows a recurring response to those problems: expose a
real command in the interface, connect it to stored state, run the scenario again,
and retain evidence of the result. It also shows regression work as product
language and layout changed.

## The practical lesson in the records

Keeping agents busy was easier to measure than making the product usable.
The useful unit of progress was a workflow that survived a specific situation,
not a count of screens, commits, or tokens. The records support that distinction
even where they do not settle the product's readiness for a real shop.

*Evidence: repository commit chronology; selected May and June Codex sessions;
pilot-readiness notes. Dates and source boundaries are documented in the
[evidence notes](/projects/struxos-conductor/evidence/).*
