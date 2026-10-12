---
title: "What I built"
description: "Two connected systems: software for a fabrication shop, and a harness that kept agents working on it."
order: 1
---

## A test bed for the agents

My starting ambition was an industry-leading project management tool. I chose a
fabrication shop as the domain because I know that work well enough to judge
whether the agents got it right. The requirements came from public shop-tour
videos, written shop simulations, and persona audits run by the agents, and this
case study describes StruxOs only by what it actually implemented and tested.

The domain mattered for one reason: it gave the agents hard, checkable questions.
A generic task board can say that a job is in progress. A shop needs to know
whether the material is there, the drawing is current, and a quality hold should
stop the work. Those questions became rules the agents had to implement and prove.

## What StruxOs actually did

These are the rules with tests in the repository, several with recorded passing
runs described in the [validation chapter](/projects/struxos-conductor/validation/):

- **Station work waits for material.** A station cannot start a job until the
  required material has been received and verified.
- **Repeated work needs an approved mockup.** New copies of a repeated design are
  refused until a mockup approval is recorded, with approver, time, and comments.
- **A cut and its label share one identity.** The cut record and its printed label
  carry the same identifier, and labels can be reprinted after cutting.
- **Supplies are attributable.** Each issue of consumables records the employee,
  station, and work order, and an issue without an employee is rejected.
- **Quality holds stop movement.** QA records pass, hold, or rework, and situation
  scripts check that held work stays off a shipment.
- **Each company sets its own strictness.** Workflow rules can be enforced,
  advisory, or off per company, because not every shop runs the same process.

A one-week pilot runbook ties these together for one company, one project, and a
single batch of work, followed through each shop role. A runbook is a plan, not
evidence that a shop has used it; no outside shop pilot took place.

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
