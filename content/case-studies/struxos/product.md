---
title: "What I built"
description: "Two connected systems: software for a fabrication shop, and a harness that kept agents working on it."
order: 1
---

## The product became more specific than the original brief

My starting ambition was an industry-leading project management tool. StruxOs
developed into something more focused: a prototype for coordinating a mechanical,
electrical, and plumbing fabrication shop, from the work released by a designer
to the assemblies received in the field.

That focus matters. A generic task board can say that a job is in progress. A
shop needs to know whether the material is available, the drawing is current,
the worker can perform the operation, and a quality hold prevents shipment.
Those became concrete product questions for the agents to work against.

## Following one package through the shop

The pilot runbook narrows the product to one company, one project, one shop site,
and one work package. The intended operating path is:

1. **Set up the shop.** Establish the company, project, users, roles, and stations.
2. **Release work.** A designer or VDC lead prepares a package with its drawing
   and revision context. VDC means virtual design and construction.
3. **Prepare materials.** Identify shortages, substitutions, and receiving problems
   before work reaches a station.
4. **Build at the station.** A worker follows a traveler, the record that accompanies
   the work through its operations, and records progress or blockers.
5. **Inspect.** QA records a pass, hold, or rework decision.
6. **Load and dispatch.** Coordinate bundles, load plans, and shipment evidence.
7. **Receive in the field.** Record arrival and exceptions such as damage or missing parts.
8. **Review the day.** Follow the package's decisions and handoffs across the roles.

This is the product's organizing workflow. Its existence in a runbook does not
mean a customer has run it successfully. The [validation chapter](/projects/struxos-conductor/validation/)
separates the implemented and tested portions from that stronger claim.

## The application underneath

StruxOs uses ASP.NET Core on .NET 10 for the backend and Vue 3 with TypeScript for
the browser interface. The repository separates domain rules, application use
cases, infrastructure, and API controllers, and architecture tests enforce that
direction of dependency. PostgreSQL and MongoDB appear in the development stack,
which runs through Docker Compose.

The source history includes organization and role administration, fabrication
and logistics workflows, station controls, material-readiness rules, and
scenario-specific checks. These are implemented components, not just a proposed
architecture. Their reliability still depends on the particular route, data, and
test being examined.

## How much the agents produced

Measured on the tracked files in October 2026:

| Part | Size |
| --- | --- |
| C# (backend and its tests) | about 251,000 lines in 2,065 files |
| TypeScript | about 122,000 lines |
| Vue components | about 74,000 lines |
| .NET tests | 3,567 facts and 297 theories across the Domain, Application, Infrastructure, and Api test projects |
| Client tests | 541 test files, about 2,660 tests; the last recorded run passed 2,656 of 2,656 |
| Scenario scripts | 81 runnable Docker and Playwright scripts and 17 situation demonstrations |
| Planning documents | about 190 Markdown documents plus a 1,733-note Obsidian vault the agents kept as a work log |

Size is not quality. A large share of these lines are tests and planning
documents written by the agents to keep themselves on track, and the
[architecture chapter](/projects/struxos-conductor/architecture/) shows that some
of the largest files are exactly the ones I would have wanted smaller.

## Conductor: the system around the agents

The second product was Conductor, a Python daemon I built in late June so that
agents could keep working on StruxOs without me attending each session. Each
cycle it reads a plan, picks tasks from a Markdown queue, gives each task to a
one-shot Codex or Claude run in its own git worktree, tests the change, merges it
only if the full test gate passes on the merged result, and records the outcome.
When the queue runs low, audit scripts generate new tasks.

In its busiest week it landed about 1,040 tasks on StruxOs. It also exposed most of
the hard problems in unattended development: work selection, merge contention,
silent failures, runaway retries, and what a loop should do when the main branch
breaks. Those are covered in [From /loop to Conductor](/projects/struxos-conductor/harness/).

*Evidence: StruxOs README, source layout, and a line count of tracked files;
one-week shop pilot runbook; Conductor's June 20 design, source, and ledger. See the
[evidence notes](/projects/struxos-conductor/evidence/).*
