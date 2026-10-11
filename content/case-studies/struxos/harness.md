---
title: "From /loop to Conductor"
description: "Three generations of agent harness, each built to remove me from the loop, and what each taught me about context, parallelism, gates, and cost."
order: 5
---

## The problem every harness was solving

An agent session is good at a task and poor at a week. It runs out of context,
waits for permission, stops to summarize, or declares victory. Every harness in
this project was an attempt to answer one question: what has to be true for agents
to keep making useful changes when I am not watching?

I built the answer three times, each time with the agents' help.

## Generation 1: loops and goals inside the session (May 24 – June 5)

The first harness was Claude Code itself. `/loop` re-ran a prompt on an interval,
which suited periodic reviews; `/goal` kept a session working until an objective was
met, which suited building. I ran two to four Claude sessions alongside Codex,
divided the work by large file and by track, and relayed between them myself.

What it taught me:

- **Shared working trees do not scale past one agent.** Within hours of the first
  deliberate parallel run, agents had committed each other's files and edited the
  same component twice. Separate git worktrees, with a merge to main at the end of
  every iteration, became mandatory.
- **Sub-agents work when the tracks are truly separate.** About thirty worktree
  sub-agents on June 3–5 merged cleanly because each owned a different part of the
  domain. Two lessons came with it: a sub-agent merged its own work despite being
  told not to, and another rebuilt files that already existed because its branch
  started from a stale base.
- **I was still the scheduler.** Prompts such as "codex is on break until monday,
  you have free access" show that ownership of the code was negotiated by me,
  one message at a time.

## Generation 2: a scripted loop around Pi (June 9–21)

To take myself out of the relay, I moved the unattended work to Pi, an open-source
coding agent that I could extend and script, running OpenAI's gpt-5.5 model. I also
wrote a small Pi package that let Pi drive a long-running Claude Code session through
tmux. That one went no further.

The loop itself went through three versions in a week:

1. A Pi extension that re-injected a continue prompt whenever the agent's answer
   ended with "Recommended next step: continue." It required patching the installed
   Pi runtime.
2. An Expect script that watched Pi's terminal, stripped the live token counter
   so it could tell whether output had changed, and typed the continue message
   after two minutes of silence.
3. A shell loop that started **one fresh, non-interactive Pi session per batch**.
   Nothing carried over in the conversation; "repo/control docs carry state." A
   priority file, stop rules, a slice template, and grouped todo files told each new
   session what to do and when to stop.

![Side-by-side diagram. Before: one long Pi session kept alive by an Expect script typing "continue", with the goal and turns piling up in context until they are compacted; state lives in the conversation and a crash or compaction loses it. After: three fresh batch sessions, each reading and then updating control documents in the repository; state lives in files and any batch can fail without losing it.](/images/projects/struxos-conductor/session-vs-files.svg)

*The change between the second and third versions of the loop. Moving state out
of the conversation and into the repository is the idea every later design kept.*

Around the loop I added a context-compression proxy, an extension that trimmed
repeated control documents and long tool output from the context, scheduled
morning and afternoon audit personas, and a way to watch and steer a session from
my phone over IRC.

The third version was the important result. **A fresh context per batch, with state
in files, beat a long session that had to be kept alive.** Every later design kept
that idea. This generation also produced the placeholder-cue failure described in the
[goals chapter](/projects/struxos-conductor/goals/). The loop could run unattended,
but nothing in it could tell good work from busy work.

## Generation 3: Conductor (June 20–29)

On June 20 I described what I wanted to Claude in a home-directory session:

> I have todo .md files, audit scripts, that I want the agent... to run
> continuously without my input.

> i want this to reopen new sessions to keep session context down, i want this to
> commit early and often, i want this to work parallel when possible.

Further requirements followed in the same session: run plans and cycles, show
progress in a web console, update the system while it is running, and "no work in
the todos means fire off the audit scripts." Claude wrote a design specification and
then implemented it as five test-driven plans, with sub-agents doing the work and
reviewers checking each task. The specification was fully implemented by 1:39 a.m.,
about nine hours after it was written. Over the following week Conductor reached 155
commits, 58 of them co-authored by Claude, and about 350 tests that use real
temporary git repositories rather than mocks.

![Diagram of Conductor's cycle, repeated every 30 seconds: 1 Queue, a Markdown todo list refilled by audit scripts when fewer than 40 tasks remain; 2 Route, Codex by default and Claude only within subscription headroom; 3 Edit in a fresh worktree, where the agent edits and Conductor owns commits; 4 Fast gate, path-scoped tests with up to two repair passes before a task is blocked; 5 Merge train, ready branches merged and verified by one full test gate; 6 Land and record, main advances only on green and every outcome is written to a ledger.](/images/projects/struxos-conductor/conductor-loop.svg)

The central design decision was a division of authority. **Agents only edit files.
Conductor owns commits, tests, merges, and pushes.** An agent cannot mark its own
work as done. A change reaches main only after the full gate passes on the merged
result, in a separate worktree, so main never holds untested code.

### What it did

In the week from June 21 to June 27 the ledger records:

| Measure | Value |
| --- | --- |
| Task attempts | 1,353 |
| Landed on main | 1,030 (about 80% of attempts that produced a change) |
| Blocked | 257: worker gave up 92, tests red 89, merge conflict 14, merge verification 8, and other reasons |
| No change needed | 66 |
| Busiest day | 299 tasks landed on June 22 |
| Median task time | 4.4 minutes (90th percentile 23 minutes) |
| Merged but failed to push | 119, later retried automatically |

Most work went to Codex, which had the larger subscription allowance. Claude handled
audits and was used for code only while its usage stayed under a threshold.

### What it taught me

Each of these appears in the commit history as a problem followed by a fix:

- **The merge gate is the speed limit.** The full gate took about 13 minutes, so
  adding workers added waiting, not throughput. A fast path-scoped pre-check, then a
  *merge train* that verified a whole batch of branches with one gate run, raised
  throughput.
- **More parallel gates made it slower.** I tried three gate lanes, each with its own
  databases. Because each verification took 13 minutes while main kept moving, every
  lane kept finding its base out of date and starting over. The plan file records the
  result: "0 lands in 35min + load spiked to 18." It went back to one lane.
- **Some files have to be serialized.** Parallel tasks kept colliding on a
  9,000-line Vue component, so edits to it were forced through one at a time.
- **Retries need memory.** Workers are one-shot and worktrees are deleted, so a retry
  started blind. Conductor began saving the failed diff and gate output and
  prefacing the retry with "YOUR PREVIOUS ATTEMPT AT THIS EXACT TASK FAILED."
- **Cost needs a hard cap, not a guideline.** A usage analysis found one Claude
  session that had retried 1,048 times, roughly $1,500 at API list prices (I was on
  a subscription, so this was not an actual bill). Every Claude worker got a
  per-session budget cap, and code work went to Codex by default.
- **Silent failures are the dangerous ones.** After an unattended security update,
  Codex's sandbox stopped working. The result was "an alive daemon with 0 open tasks
  and no error." Conductor gained a cheap sandbox probe that routes work to Claude when
  Codex is broken. Similar fixes followed for a daemon killed mid-merge, worker
  heartbeats left behind after crashes, and a stop script that matched its own
  process and killed the wrong one.
- **Testing on a schedule is free; fixing is not.** A token-free health check ran the
  gate on main every 30 minutes and queued a single repair task only when main was red.

### How it ended

On June 28 main went red. The repair task failed three times; one attempt touched 42
client files before failing the gate. The task generators were then disabled, and
Conductor stopped doing code work after June 29.

The postmortem found a design gap worth more than any single fix. Conductor could
*detect* a red main, but it could not *escalate* one: health-check cycles did not
count toward the circuit breaker that pauses the system, and the alert channel had
never been wired to a real destination. Detection without escalation is only half of
an unattended system. Any harness I build next treats "can it reach a person, and does
it know when to stop?" as a requirement with its own test.

## Was I building something that already existed?

On June 27 I asked both Claude and Codex to "search github for a project like the
conductor. are we building something that already exists?" They compared it with
several open-source orchestrators, and I started adopting one project's runner
abstraction. The honest answer was partly yes. The parts specific to my situation,
such as the merge train, the hot-file locks, the headroom routing, and the audit
generators, were what made it work on this repository.

*Quotations from my prompts keep my wording, with spelling corrected. Evidence:
Claude's project memory; my Claude and Codex prompt history; the Pi scripts,
extensions, and control documents in the StruxOs repository; Conductor's design,
plans, source, tests, commit history, and ledger. See the
[evidence notes](/projects/struxos-conductor/evidence/).*
