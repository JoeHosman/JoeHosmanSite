---
title: "Evaluating the agents"
description: "What 1,380 gated task attempts say about which work agents finish, how Claude and Codex differed, and what the data cannot answer."
order: 6
---

## The dataset and the grader

*For the new paired experiment, see the [controlled benchmark](/projects/struxos-conductor/benchmark/).
This chapter describes the historical, observational ledger.*

Conductor appended every task attempt to a ledger. Between June 21 and June 29 it
recorded **1,380 code-task attempts** on **1,141 distinct tasks**. Each attempt
ended in one of three outcomes:

- **Landed:** the change passed a path-scoped test run in its worktree, was merged,
  and then passed the full gate on the merged result: four .NET test projects, the
  Vue type-checker, and the client test suite.
- **Blocked:** the agent's run failed, its tests failed even after up to two repair
  passes, or the change could not be merged and verified.
- **No change:** the agent found nothing to do, usually because the task was already
  satisfied.

The gate was the grader. That makes the evaluation automatic and consistent, and it
also sets its limit: a landed change is one the test suite accepted, not necessarily
one a shop would value. The agents wrote many of those tests themselves. I report
**landing rate** as landed ÷ (landed + blocked), leaving no-change attempts out.

## Headline numbers

| Measure | Value |
| --- | --- |
| Attempts | 1,380: 1,043 landed, 271 blocked, 66 no change |
| Landing rate | 79.4% |
| Tasks that landed on the first attempt | 944 of 1,141 (83%) |
| Tasks that eventually landed | 1,016 of 1,141 (89%) |
| Files changed per landed task | median 2, 90th percentile 4, maximum 16 |
| Time per landed task | median 5.0 minutes (Codex), 3.5 minutes (Claude) |

The changes were small by design: most of the task generators were instructed to produce the
smallest slice that could pass the gate.

## Finding 1: the type of task predicted the outcome

![Horizontal bar chart of landing rate by task type: architecture refactors 100% of 68 attempts, domain-model refactors 90% of 601, audit-generated tasks 77% of 429, frontend extractions 76% of 107, and pilot product features 21% of 104.](/images/projects/struxos-conductor/landing-by-type.webp)

| Task type | Attempts landed or blocked | Landed | Landing rate |
| --- | ---: | ---: | ---: |
| Architecture refactors | 68 | 68 | 100% |
| Domain-model refactors | 601 | 540 | 90% |
| Audit-generated tasks (features, fixes, tests) | 429 | 331 | 77% |
| Frontend component extractions | 107 | 81 | 76% |
| Pilot product features | 104 | 22 | 21% |

The pattern is the most useful result in the data. The narrower and more mechanical
the task, the more reliably it landed. Architecture and domain refactors move existing
behavior behind a test suite that already describes it, so the grader can check the
change completely. Pilot features asked for something new across every layer:
storage, an endpoint, types, a screen, and tests. Those landed one time in five.

That is also why the system drifted. A loop that measures itself by landed tasks
rewards the work that lands. Over the week the generators produced 601 domain-refactor
attempts and 104 pilot-feature attempts. Throughput and product value pointed in
opposite directions, and only a human decision (retiring the refactor epic on June 26)
changed the mix.

## Finding 2: Claude and Codex differed less than the totals suggest

Conductor began recording which agent ran each task on June 23, so 564 of the attempts
are attributed. Taken at face value, Codex landed 80% (345 of 430) and Claude 71%
(59 of 83). Split by task type, the picture changes:

| Task type | Codex | Claude |
| --- | --- | --- |
| Domain-model refactors | 195 of 198 landed (98%) | 29 of 30 (97%) |
| Pilot product features | 21 of 83 (25%) | 1 of 21 (5%) |
| All attributed attempts | 345 of 430 (80%) | 59 of 83 (71%) |

On routine refactoring the two were indistinguishable. Much of Claude's lower total
comes from mix: a quarter of its attempts were pilot features, against a fifth of
Codex's. On pilot features Codex did better, but with 21 Claude attempts and routing
that alternated by turn and by subscription headroom rather than at random, that is a
hint, not a result.

The agents failed differently. Of Codex's 85 blocks, 47 were failing tests and 25 were
merge conflicts or merge-verification failures, so Codex usually produced a change
that the gate then rejected. Of Claude's 24 blocks, 18 were runs that ended without a
usable change. Claude was faster when it succeeded: a median of 3.5 minutes per landed
task against 5.0 for Codex.

## Finding 3: I cannot tell whether retry memory helped

On June 26 Conductor began giving a retried task the diff and test output from its
failed attempt. Before that change, retries after a block landed 74 of 161 times (46%).
Afterwards they landed 5 of 42 times (12%).

That does not show that retry memory hurt. After June 26 almost every retry was a
pilot feature, the hardest category in the data. The comparison is confounded, and
the honest conclusion is that this ledger cannot answer the question. Answering it
would take the same failed tasks retried with and without the memory.

## Finding 4: some failures belonged to the harness, not the agent

An evaluation of agents should not charge them for the harness's mistakes. In this
ledger:

- 31 of the 271 blocks came from merge conflicts, merge verification, or pipeline
  errors caused by parallel work rather than by the agent's change.
- 66 no-change attempts, 58 of them domain refactors, were tasks the audit generator
  proposed after the work was already done. They measure the generator, not the
  worker.
- 119 landed changes merged locally but failed to push on the first try and were
  retried.

Separating these from agent failures moves the agent-attributable landing rate up by
a few points. More usefully, it shows where the next engineering hour should go.

## What it cost

Conductor did not record cost per task. Codex's local state records about 1.44 billion
tokens across 2,328 sessions in Conductor's worktrees, including the audit runs that
generated tasks. That is roughly 1.4 million processed tokens per landed task, most of
it cached context re-read at the start of each fresh session (see the
[token chapter](/projects/struxos-conductor/tokens/)). Claude's usage was not retained.

## What a stronger evaluation would look like

This is an observational dataset collected while trying to build a product, not a
designed experiment. If I ran it again for measurement, I would:

1. Fix a task set in advance and assign agents at random.
2. Record tokens, cost, and wall time on every attempt.
3. Separate harness failures from agent failures in the outcome itself.
4. Have a person review a random sample of landed changes for value, because the gate
   only measures whether tests pass.
5. Track whether landed changes survive: how many are reverted or rewritten within a week.
6. Run retry-with-memory against plain retry on the same failures.

*Evidence: Conductor's two ledger files (June 21–27 and June 27–29), its routing and
retry-memory commits, and Codex's local session state. Task types come from the epic
prefix on each task; untagged tasks came from the audit generators. See the
[evidence notes](/projects/struxos-conductor/evidence/).*
