---
title: "The token footprint"
description: "11.59 billion observed Codex tokens, mostly cached input—and why the accounting needed a session-history audit."
order: 8
---

## What the surviving logs can tell us

The retained StruxOs-associated Codex logs contain **11,592,865,835 observed
tokens** after removing replayed fork history. This is a measure of model token
processing recorded locally, not a complete project bill, a count of unique
words, or a measure of software quality.

The usage records span **May 24–July 5, 2026 UTC** (May 23–July 5 in my local
Central time). The audit found **2,438 StruxOs-associated session files**: 30 CLI
sessions, 2,346 exec sessions, and 62 subagent sessions. Those include forks and
automated work, so they are not 2,438 independent conversations with me. Usage
was present in 2,429 files; nine had none.

## The components, without double counting

| Component | Observed tokens | How to read it |
| --- | ---: | --- |
| Input, including cached input | 11,559,994,171 | The input total reported by Codex. |
| Cached input | 11,142,698,496 | A subset of input, not an additional amount. |
| Input minus cached input | 417,295,675 | The remaining input after subtracting that subset. |
| Output | 32,871,664 | Includes reported reasoning output. |
| Total: input plus output | **11,592,865,835** | The observed StruxOs measure. |

**96.39% of input was reported as cached.** Reusing a large context repeatedly
can produce an enormous processed-token count without producing that much new
text. The output includes 5,325,575 reported reasoning tokens; those must not be
added a second time either.

Two sessions whose working directory was Conductor itself add **64,068 observed
tokens**, reported separately. That small sample is not a credible estimate of
all the work needed to develop Conductor. Worker sessions inside StruxOs's
Conductor worktrees are already attributed to StruxOs.

## Why a simple sum was wrong

Some resumed or forked sessions replayed earlier history. They had new session
IDs and rewritten timestamps, but retained original turn IDs and cumulative
usage counters. Adding each file's final total would have produced an incorrect
**30.07-billion-token** figure for StruxOs.

The audit instead:

1. Selected sessions using their actual recorded working directory, including
   project worktrees. A passing mention of StruxOs did not qualify a session.
2. Read cumulative token counters and calculated the increases between snapshots.
   Repeated snapshots were not counted as new work.
3. Matched copied increases using the preserved turn UUID and full cumulative
   token vector, then verified equal deltas and explicit fork ancestry.
4. Removed **122,914 replayed counter transitions** across the two project scopes.
5. Checked an opposite edge case: two independent Conductor sessions had identical
   numeric usage but different turn IDs and no fork relationship. Both were retained.

After replay removal there were 90,741 positive counter transitions associated
with StruxOs. A counter transition is not asserted to equal one API request.

## The missing Claude side

Claude history retains **515 project-associated entries across 49 session IDs**,
from May 24 through July 6 UTC, plus 82 entries from the home-directory session in
which Conductor was designed and built. None of the 325 available Claude
response-transcript files matched the project working directories; the detailed
Claude transcripts had already been removed by the time of the review.

Consequently, **Claude token consumption is unavailable, not zero**. It cannot
be recovered by treating history entries as requests or by borrowing Codex's
usage patterns. The combined cost of the experiment is unknown from these records.

The absence of transcripts does not mean the absence of Claude's work. The first
version of this case study leaned on Codex because Codex left the more complete
logs. A second review found three Claude-side records that do survive: my own
prompts, the memory files Claude wrote while it worked (about forty notes recording
rules, decisions, and failures), and 1,265 StruxOs commits that carry a Claude
co-author trailer. Those records support the account of the work in the other
chapters. They cannot support a token count.

## Where the Codex tokens went

Two further records help explain the Codex total without changing it:

- Of the 2,438 StruxOs Codex sessions, **2,346 were headless runs**, and about 2,300
  of those were started by Conductor between June 21 and June 27. Most of the
  session count, and much of the cached-context processing, comes from a harness
  that started each task in a fresh session by design.
- Codex records the cost of individual `/goal` runs. The largest, a goal to write a
  persona document and screenshot audit for each shop role, ran for about 45 hours
  and recorded 50.9 million tokens before it hit a usage limit.

## What this says about the experiment

The footprint shows how much repeated context and automated activity a sustained
agent workflow can accumulate. It does not show that the system was economical,
that every token advanced the product, or that an expensive run produced a more
usable feature. The [validation evidence](/projects/struxos-conductor/validation/)
has to answer the product question separately.

These are exact arithmetic results under the documented selection and
deduplication rules. Missing logs, other machines or directories, other providers,
and requests that never wrote usage remain outside the measure. Working-directory
association also does not prove every prompt concerned only this project.
No dollar estimate is derived from these totals.

[Download the aggregate audit summary](/images/projects/struxos-conductor/token-summary.json).
The detailed manifests and raw sessions remain local. See the
[evidence notes](/projects/struxos-conductor/evidence/) for the review boundaries.
