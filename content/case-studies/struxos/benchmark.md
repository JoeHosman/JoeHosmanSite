---
title: "Controlled benchmark"
description: "Twenty fixed tasks, forty real model runs, and held-out checks. Both setups passed; the basic agent used less time and fewer tokens."
order: 6.5
---

## The result

I wanted a cleaner answer than the old ledger could give me. So I fixed a small
task set in advance, ran the same model through a basic agent setup and Conductor,
and checked the resulting behavior separately from the tests the agent could see.

**Both passed 20 of 20 tasks.** The basic agent was faster and cheaper on this set.
I am keeping that result. There is no measured completion-rate advantage for
Conductor here, and no basis for claiming one from this run.

| Measure | Basic agent | Conductor |
| --- | ---: | ---: |
| Correct tasks / scheduled tasks | 20 / 20 | 20 / 20 |
| Failed or timed-out tasks | 0 | 0 |
| Visible-gate passes rejected by held-out checks | 0 | 0 |
| Regressions that escaped the visible gate | 0 | 0 |
| Manual interventions during measured runs | 0 | 0 |
| Worker sessions, including repair sessions | 20 | 20 |
| Median elapsed time per successful task | 21.1 s | 25.0 s |
| Total elapsed task time / successful tasks | 20.9 s | 26.7 s |
| API-equivalent total cost | $0.5077 | $0.6550 |
| API-equivalent cost / successful task | $0.0254 | $0.0327 |

Time per success and cost per success include **all scheduled attempts** in the
numerator. There happened to be no failures in this campaign; failures would not
have been dropped from those calculations. Elapsed time includes worker and
Conductor processing through the final result, before independent grading.

[Download all 40 run receipts as JSON](/evidence/conductor/benchmark-v1.json) ·
[Download the comparison as CSV](/evidence/conductor/benchmark-v1.csv)

## What stayed fixed

- **Tasks:** twenty synthetic Python microtasks drawn from shop-workflow and
  harness concerns. Each is a single-file repair or small behavior change, with
  a written contract. These are newly authored fixtures, not historical StruxOs tasks.
- **Starting state:** matching Git commits and source hashes for both arms of
  every pair. No result from one task was carried into another.
- **Agent:** Codex CLI 0.162.1, requesting `gpt-6.1-sol` with low reasoning in both
  arms. This is a model alias; an immutable provider snapshot was not exposed.
- **Budget:** 180 seconds of total worker time per task per arm. Conductor's
  possible repair sessions share that allowance. Actual tokens are recorded;
  there was no claimed equal-token cap.
- **Order:** seeded task shuffle and randomized arm order, with at most two
  benchmark runs in flight. One observation per task per arm.
- **Freeze:** the task catalog, reference solutions, grader, protocol, runner,
  and source hashes were frozen before the first measured run. The downloadable
  receipt includes the manifest hash and schedule.

The basic setup gets one agent session and can inspect the repository, edit, add
its own tests, and run the visible check. Conductor uses its existing task kernel:
worktree, edit, commit, visible gate, up to two repair passes, merge verification,
and ledger. Both use the same worker adapter and task requirements. The harness
adds its workflow and repair instructions, which are part of the treatment.

This comparison exercises the **edit/gate/repair/merge kernel**, not the daemon's
task generators, provider routing, or parallel merge train. The recovery changes
were developed in a separate checkout after this benchmark snapshot was frozen.
Defect-start fixtures intentionally have a red visible check; the benchmark does
not run them through the new daemon-level red-main stop.

## How the checks work

The task requirements and visible checks are available while the worker edits.
Additional contract cases and existing-behavior checks stay outside its repository.
After the run ends, a separate process checks the final source using pristine
definitions. Changing a visible test file cannot change that score.

Before any measured run, every reference solution passed all checks, every
starting defect failed its visible check, and each existing-behavior check was
green on the starting code. A deliberately overfitted solution also passed its
visible example and failed the held-out checks, confirming that the scorer could
reject that kind of incomplete fix.

Correct completion requires all checks to pass and a real source change. For
Conductor, it also requires the verified merge to finish. Candidate correctness
is retained separately so a harness failure cannot disappear into a model score.
All forty runs completed correctly on their first worker session, so this campaign
does **not** measure the benefit of repair passes or retry memory.

Held-out means withheld from the task, not inaccessible to a hostile agent. The
host's workspace sandbox could not launch shell tools during preflight, so both
arms used the same host execution mode with instructions to stay in their task
repository. Model-access and sandbox preflights are excluded from the forty runs.

## Every task

| Task | Basic agent | Conductor |
| --- | --- | --- |
| Tenant-scoped inventory | Pass | Pass |
| Revision-specific approval | Pass | Pass |
| Exact stock arithmetic | Pass | Pass |
| QR identity round trip | Pass | Pass |
| Latest event per entity | Pass | Pass |
| Independent package copies | Pass | Pass |
| Stable dependency ordering | Pass | Pass |
| Quoted material CSV | Pass | Pass |
| Millimetres to cut length | Pass | Pass |
| Atomic material reservation | Pass | Pass |
| UTC overdue checks | Pass | Pass |
| Bounded retry delay | Pass | Pass |
| Scoped idempotency keys | Pass | Pass |
| Tie-safe pagination | Pass | Pass |
| Numeric revision sorting | Pass | Pass |
| Partial receiving status | Pass | Pass |
| Latest QA decision | Pass | Pass |
| Required station completion | Pass | Pass |
| Import validation errors | Pass | Pass |
| Cached-token accounting | Pass | Pass |

The JSON download includes each task's contract, check counts, timestamps,
starting and final hashes, time, token usage, cost estimate, and outcome.
Private source and raw agent sessions remain local.

## What the dollar amounts mean

These are **standard API-price equivalents**, not the cost of my ChatGPT
subscription or an observed bill. Each session reported input, cached input,
cache-write input, and output usage. Cached tokens are included in the input
total and are charged at their own rate in the calculation.

The rates checked on October 11 were $2 per million uncached input tokens,
$0.10 cached, $2.50 cache writes, and $10 output.
[OpenAI's model pricing](https://developers.openai.com/api/docs/models/gpt-6.1-sol)
is the source. Every measured session returned complete usage. Actual subscription
billing and any provider service-tier premiums are not inferred from these figures.

## What I take from this

This is a **ceiling result on a small pilot**. It shows that the harness can carry
these tasks through a real verified merge; it does not show that it makes a capable
model better at easy repairs. It also puts a number on the overhead.

The next useful comparison needs harder, multi-file tasks, repeated trials, and
changes that interact. Provider latency and other host activity were not controlled,
so I would not turn these timing differences into a general performance claim.

For a different question, whether failures are contained and recoverable, I ran a
separate [failure-and-recovery demonstration](/projects/struxos-conductor/recovery/).
Its injected faults are deliberately kept out of this model-quality comparison.
