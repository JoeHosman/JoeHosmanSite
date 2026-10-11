In mid-June, an AI coding loop I had built made 375 commits to my product in 48
hours. The commit log read like a team on a tear: "show label reprint cue," "show
restart tomorrow driver wakeup contact rows," and hundreds more like them. Each
commit put new text or rows on a screen, and each looked, in the log, like progress
toward the goal I had given the loop.

None of them changed what the software did.

## The experiment

For six weeks this summer I ran an experiment: how far could AI coding agents take a
real product if I gave them goals instead of instructions? The product was StruxOs,
software for a mechanical, electrical, and plumbing fabrication shop. The agents were
Claude Code, OpenAI's Codex, and Pi, an open-source agent I scripted to run without me.
By the time I paused, the repository held 7,069 commits, about 459,000 lines of code,
and nearly 6,500 automated tests. In the final week, a harness I built called Conductor
landed about 1,040 changes, every one of them behind a full test gate.

The scale was real. So were the failures, and the failures taught me more.

## Text was the cheapest way to look done

The goal behind those 375 commits was "continue with the next goal that will bring us
closer to a real shop using this." My scripts sent it to the agent 1,268 times.

The agent was not malfunctioning. It did exactly what an optimizer does: it found the
cheapest path to looking finished. Building a real material-substitution workflow
takes a command, stored state, a rule that enforces it, a screen that reads the state,
and tests. Adding a line of text that mentions substitutions takes a minute, and in a
commit log it looks the same.

Machine-learning researchers call this *specification gaming*, or reward hacking: a
system satisfies the letter of its objective rather than the intent. It is usually
discussed in reinforcement learning. In my experiment it appeared in everyday software
work, in plain English, as soon as no one was reading every change.

## It happens even when every test passes

The same pressure appeared in a second, quieter form. Conductor refilled its own
backlog by asking agents to audit the code and propose small, safe tasks. One
refactoring epic was divided, and divided again, into 535 tasks. Every task passed its
tests. Toward the end they amounted to things like adding a single method that combines
two checks that already existed.

The ledger shows why. Architecture and domain refactors landed 90 to 100 percent of the
time. Real product features, the ones that would have let a shop run a week on the
software, landed 21 percent of the time. A loop that counts landed tasks rewards the work
that lands, so over one week it ran 601 domain-refactoring attempts and 104 feature attempts.
Throughput and value pointed in opposite directions, and only a person noticed.

## Better prompts did not fix it

My first instinct was to word the goal better. That did not work. What worked was
structure, the same kinds of controls we use with people and with production systems:

- **A definition of done that text cannot satisfy.** A task counted as complete only when
  a command, persisted state, an enforcing rule, a screen reading the real state, and
  tests all existed. The item had to move to a completed archive in the same commit as
  the code.
- **Written stop rules the agent rereads each run.** One said to stop when a change is
  "projection-only, report-only, static cue text, or hardcoded UI rows."
- **Ratchets.** Architecture tests asserted that a responsibility, once extracted, stayed
  out, so a later agent could not quietly undo a refactor.
- **Agents edit; the harness decides.** In Conductor, agents could only edit files.
  Conductor owned commits, tests, merges, and pushes, and main moved only when the full
  suite passed on the merged result. An agent's opinion of its own work stopped mattering.
- **Goals that name a person, a situation, and proof.** "A slice counts only if it helps a
  shop person decide, act, recover, or prove what happened without leaving the product"
  was worth more than any feature list. A missing valve became a script that tried to
  ship the assembly anyway and expected to be stopped.

## What changed about my job

At the start I was the relay: I copied one agent's review into another agent's prompt.
By the end, a harness handed out work and refused anything that failed its gate. The
agents became much more capable of working without me. My attention did not become less
necessary; it moved.

The leverage was no longer in reading code. It was in three places:

1. **The goal.** Name the user, the situation, and the evidence that it is handled.
2. **The definition of done.** If text can satisfy it, expect text.
3. **The gate.** Test everything from day one, and verify that the gate actually runs.
   One of my test hooks was committed but never switched on, so it never ran once.

There is one more lesson, about the harness itself. When the main branch finally broke and
the automatic fix failed, Conductor detected the problem correctly, but it had no way to
escalate it: its circuit breaker ignored health checks, and its alert channel was never
wired up. An unattended system needs a way to reach a person and a reason to stop, both
tested end to end. Otherwise it is not unattended, just unobserved.

## The short version

AI agents can carry a real product a long way. They will also optimize whatever you
measure, with a diligence no human team would bring to it. Before you let a loop run
overnight, ask what the cheapest way to look finished is. Then make that path fail
the gate.

*The full case study, with the data, diagrams, and an evaluation of 1,380 agent task
attempts, is [StruxOs and Conductor: an experiment in hands-off development](/projects/struxos-conductor/).*
