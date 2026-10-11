---
title: "Programming by goals"
description: "Steering agents with outcomes instead of instructions: milestone chains, goal files, personas, and situations. And what happened when a goal could be met with text."
order: 3
---

## From instructions to goals

Most of my early prompts were ordinary instructions: build this panel, add that
role, commit. Within a week the prompts had become goals: a statement of the
outcome, a constraint or two, and permission to keep going until it was met.
Claude Code's `/goal` command (55 uses) and Codex's equivalent (52 uses) were the
mechanism. A goal keeps the agent working across many turns and checks after each
one whether the objective has been reached.

The shape stabilized quickly. On May 30 a typical goal read:

> /goal complete the m5 slice (on a worktree) and merge into main. Do it in small
> slices (there's a parallel agent working). uncle bob's clean architecture is a must!

Once a milestone list existed, the goals shrank to pointers into it: "/goal m8",
"/goal continue m26 to m30", "/goal continue to m175", and finally "/goal keep
trucking to m250". Claude's memory records the chain of virtual-design-and-construction
milestones reaching M250 on May 31. The goal named a tracked artifact rather than
the work itself, which let a short prompt carry a large amount of intent.

## Four kinds of goal

The records show four forms, which I adopted roughly in this order:

1. **Milestone pointers.** A planning document (Claude's spec-and-plan workflow
   produced about 35 milestone specs on May 30 alone) defined the work; the goal
   said how far to go.
2. **Goal files.** A whole document became the goal. The largest,
   *Make StruxOS Usable In A Real MEP Prefab Shop*, ran 867 lines and was edited
   148 times in two days as the agent updated its own progress section. Two lines
   from it became the project's thesis:
   > The shop is the test. The role is only a witness. The pilot is the proof.
   >
   > A slice counts only if it helps a shop person decide, act, recover, or prove
   > what happened without leaving the product.
3. **Persona audits.** I asked agents to inspect StruxOs as a specific shop role
   and to forget what they knew: "audit struxos with this actor in mind: also,
   remember you don't know struxos well at all, you're just a fab guy." The
   complaints went straight back in as goals ("/goal review and fix the audit
   complaints").
4. **Situations.** Rather than features, I described things that go wrong in a
   real shop and asked whether the software would help. These are described below.

I also used the agents to write goals for each other. Several Codex prompts are
some version of "give me a goal to give to claude," followed by pasting Claude's
completion report back with "claude is ready for the next goal."

## Situations as the source of goals

The situation work grew through three stages:

| Date | Artifact | What it contributed |
| --- | --- | --- |
| May 31 | A fictional 60-person, two-shift MEP shop, a scenario library of about 20 bad days, and verdicts on 28 scenarios | A cast of roles and a baseline: 3 answered, 13 partial, 12 missing |
| June 12 | Ten "bad day in the shop" simulations, such as a missing valve substitution, a drawing revised after cutting, and a pressure test failure | Timestamped dialogue between shop roles, each ending in two or three software lessons |
| June 30 – July 4 | A pilot script catalog | 81 runnable Docker and Playwright scripts and 17 situation demonstrations written as trigger, gate, recovery, and proof |

Each stage made the goal more checkable. A paragraph about a missing valve becomes
a rule that a substitution needs approval, dimensional review, and revision
tracking, and then a script that tries to ship the assembly without them and
expects to be stopped. The [validation chapter](/projects/struxos-conductor/validation/)
follows four of those rules through to recorded test results.

## When a goal can be met with text, it will be

Between June 11 and June 14 the unattended Pi loop produced hundreds of commits
with subjects like "show label reprint cue" and "show restart tomorrow driver
wakeup contact rows." Each added static text or hard-coded rows to a screen.
Each looked, in a commit log, like progress toward "a real shop using this."
None changed what the system did. A later audit counted 375 of them in 48 hours.

The loop was not malfunctioning. It was optimizing the goal it had been given,
and on-screen text was the cheapest way to make a screen appear to address a
situation. Better wording in the prompt did not fix it. Three structural changes did:

- **Stop rules** in a control document the loop read every batch, including:
  stop "when the change is projection-only, report-only, static cue text, or
  hardcoded UI rows."
- **A definition of "workflow-complete"**: a command, persisted state, a gate
  that enforces it, an API and screen that read the real state, and tests. A todo
  item could be closed only when all of these existed.
- **An archive rule**: a completed item had to be moved out of the active todo
  file in the same commit as its implementation. 530 commits touch that archive.

![Two-lane diagram. Top lane: a goal to get "closer to a shop" leads the agent to add static cue text with no new behavior, which looks done in the commit log; a stop rule now blocks that path. Bottom lane: a situation such as a missing valve becomes a rule with a command, state, a gate, and tests, which is scripted as a check that tries the situation and saves proof; the todo item closes only when all of these exist, in the same commit.](/images/projects/struxos-conductor/goal-paths.svg)

*The same intent, two goal shapes. The top path was the cheapest way to satisfy
the goal, so the loop took it hundreds of times until a stop rule closed it.*

The following week was spent converting the placeholders into real commands and
stored state.

## Goals that run out of value

The opposite failure appeared under Conductor. An audit generator broke a large
refactoring epic into the smallest safe slices it could find, and kept going. One
epic produced 535 tasks, ending in items like adding a single method that combines
two existing checks. Every task passed its tests. On June 26 the epic was retired as
"exhausted," with the explanation that the remaining internal refactors "don't move
the product toward a usable pilot," and new tasks had to be "a COMPLETE vertical
capability (persistence+endpoint+types+UI+tests), not a per-layer micro-slice."

Taken together, the two failures mark out the useful range. If a goal can be
satisfied with text, it invites theater. If it can be divided indefinitely, it
invites busywork. The goals that worked named a user, a situation, and evidence
that the situation had been handled.

*Evidence: my Claude and Codex prompt history; Codex goal records; the goal
document, scenario library, simulations, and script catalog; the placeholder audit
and stop rules; Conductor's plan and todo archive. See the
[evidence notes](/projects/struxos-conductor/evidence/).*
