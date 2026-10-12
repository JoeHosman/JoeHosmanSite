---
title: "StruxOs and Conductor: an experiment in hands-off development"
summary: "A coding-agent harness with isolated workspaces, verified merges, and durable recovery. A controlled comparison, a failure demo, and what I learned building StruxOs."
date: "2026"
categories: [agentic-development, software, process-automation]
status: paused
featured: true
draft: false
cover: ""
cover_alt: ""
media:
  - type: video
    src: /media/projects/struxos-conductor/repository-growth.mp4
    poster: /images/projects/struxos-conductor/repository-growth-poster.webp
    caption: "Gource animation of the StruxOs repository from May 23 to June 20, 2026: the clean-architecture backend, the Vue client, the test projects, and the agents' planning documents growing as commits land. The date overlay is stuck on the render date."
    width: 1280
    height: 720
---

## My decisions

I moved authority out of the agent and into the harness: isolated worktrees,
harness-owned commits, checks on the merged result, and a record of each outcome.
I moved working state out of long conversations and into files a fresh session
could read. And I changed goals that rewarded activity into conditions that
required observable behavior.

The October follow-up adds measured comparisons and deliberate fault tests. With
Codex assisting on implementation, I added a durable stop for red main, a local
alert receipt that survives missing external delivery, explicit verified recovery,
and preservation of an interrupted worker's partial diff. Those are tested on
small fixtures; the original StruxOs product remains paused.

The source is private. Conductor's code and the detailed run artifacts are
available on request. For the longer story, start with the essay
[AI agents will game any goal that text can satisfy](/writing/agents-game-goals/).

## How far could the agents take it?

At the beginning of 2026, I set Codex and Claude an ambitious challenge: build an
industry-leading project management tool with as little direction from me as
possible. I used goal-driven sessions (`/loop`, then `/goal`) and introduced
YouTube shop-tour transcripts and simulated bad days in a fabrication shop as
situations the product should handle.

The result was **StruxOs**, a fabrication-shop workflow prototype, and
**Conductor**, a harness I built so agents could keep working on it without me in
the loop. The experiment is paused. The original ambition frames the
investigation; it is not a claim that the prototype became an industry leader.

## Read the case study

1. [What I built](/projects/struxos-conductor/product/): the application,
   the shop rules it implemented and tested, and the size of what the agents produced.
2. [How the experiment progressed](/projects/struxos-conductor/development/):
   the eras of the project, from Codex scaffolding through Claude's goal sprints,
   the Pi loop, and Conductor.
3. [Programming by goals](/projects/struxos-conductor/goals/): how I steered
   with goals, personas, and situations, and how the agents gamed goals that
   could be met with text.
4. [Clean Architecture under agent pressure](/projects/struxos-conductor/architecture/):
   adversarial "Uncle Bob" reviews, architecture tests, a maintainability
   ratchet, and the god objects that grew anyway.
5. [From /loop to Conductor](/projects/struxos-conductor/harness/):
   three generations of agent harness, and what each one taught me about
   context, parallelism, gates, and cost.
6. [Evaluating the agents](/projects/struxos-conductor/evals/):
   what 1,380 gated task attempts show about which work agents finish, how
   Claude and Codex differed, and what the data cannot answer.
7. [Controlled benchmark](/projects/struxos-conductor/benchmark/): twenty fixed
   tasks, forty real model runs, held-out checks, and complete per-run receipts.
8. [Failure and recovery](/projects/struxos-conductor/recovery/): a bad edit,
   a terminated worker, and a red-main incident, with an embedded two-minute replay.
9. [From shop tours to executable checks](/projects/struxos-conductor/validation/):
   four concrete transcript-to-rule examples, recorded test results, and a
   saved browser evidence card.
10. [The token footprint](/projects/struxos-conductor/tokens/):
   11.59 billion observed Codex tokens after removing replayed history, and
   what the Claude-side records can and cannot say.
11. [What I would keep and what I would change](/projects/struxos-conductor/lessons/):
   the lessons I would carry into the next agent-built product.
12. [Evidence and open questions](/projects/struxos-conductor/evidence/):
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

The process evidence is clearer than the product evidence. The records show
agents sustaining work for days, a harness that landed changes only behind a
test gate, and a repeated pattern: whenever a goal could be satisfied with text
instead of behavior, the agents found that path. Most of my useful interventions
were corrections to the goal, the definition of done, or the gate rather than to
the code itself.

The token audit likewise separates observation from inference. **96.39% of the
recorded Codex input was cached context**, and Claude's token usage was not
retained. The token count is neither unique generated content nor a complete
bill for the experiment.

## Historical scale, May–July 2026

| Measure | Value |
| --- | --- |
| Calendar span of the repository | May 23 – July 6, 2026 (45 days) |
| Commits to StruxOs | 7,069 |
| Code today | about 459,000 lines of C#, TypeScript, and Vue |
| Automated tests | 3,864 .NET test methods and about 2,660 client tests |
| Prompts I typed | 597 to Claude, 549 to Codex |
| Prompts sent by my scripts | about 3,350 automated follow-up prompts to Pi |
| Tasks landed by Conductor | about 1,040 in one week, each behind a full test gate |

![Stacked bar chart of daily StruxOs commits from May 23 to July 6, 2026, coloured by source: interactive Codex and Pi sessions in late May and mid-June, Claude Code bursts at the end of May and early June, the Auto Pi identity from June 14 to 21, and Conductor's Codex workers dominating June 21 to 27 with a peak near 600 commits on June 22.](/images/projects/struxos-conductor/commits-by-harness.webp)

*Commits per day, attributed by commit trailer, git identity, and subject prefix.
Claude Code is the only tool that signs its commits, so the other categories are
inferred from how and when the work ran. A commit count measures activity, not
value; the chapters below look at what the activity produced.*
