---
title: "What I would keep and what I would change"
description: "The practices that earned their place, the ones I would drop, and how I would start the next agent-built product."
order: 9
---

## What I would keep

**Fresh context, durable state.** The biggest single improvement in the experiment
came from giving up long-lived agent sessions. A short run with a clean context,
reading its instructions and progress from files in the repository, was more
reliable than a session kept alive with prompts. Conductor took this to its
conclusion: every task was a one-shot run in its own worktree.

**Agents edit; the harness decides.** When agents could commit and merge their own
work, they sometimes merged too early, merged against instructions, or did not merge
at all. When Conductor owned commits, gates, merges, and pushes, an agent's opinion
of its work stopped mattering. Only the gate's result did.

**Goals that name a user, a situation, and proof.** Requiring every slice of work to
help someone in the shop decide, act, recover, or prove what happened was a better
instruction than any feature list. Situations from real shop
work gave the agents something to fail against.

**Adversarial review with receipts.** An "Uncle Bob" persona asked for a candid verdict
produced the most useful reviews in the project. They became trustworthy once every
finding had to cite a file, a line, and the command that verified it.

**Ratchets over aspirations.** Architecture tests that prevented an extraction from
being undone, and a baseline that could only tighten, kept gains from eroding over
thousands of autonomous commits.

**Rules written down where the agent will read them.** The rules in Claude's memory
(use worktrees, merge every iteration, never use in-memory persistence) were each
written immediately after a specific failure, with the reason attached, so a later
session could apply the rule without repeating the mistake.

## What I would change

**Define "done" before the first loop, not after the first 375 placeholder
commits.** Every goal that could be satisfied with text eventually was. The
definition of workflow-complete should come before the first unattended run.

**Gate everything from the first day, and check that the gate runs.** The tests
outside the gate rotted, and the committed pre-push hook was never active. A gate I
have not seen fail is a gate I should not trust.

**Design for the bad day of the harness itself.** Conductor handled failed tasks
well and a failed main badly. It could detect a broken main but had no path to
escalate it, because health checks never counted toward the circuit breaker and the
alert channel was never wired up. An unattended system needs a stopping condition
and an alert path, both tested end to end.

**Prefer vertical slices to infinite decomposition.** Small slices merged safely,
but an epic that could be divided indefinitely produced 535 tasks that each passed
and together added little. Each task should change what a user can do.

**Put user experience in the goal from the start.** The agents optimized for what
the goals and gates measured. Nobody measured whether a person could find the next
action on a 22,000-pixel page until I looked myself. The final week's viewport
budgets should have been an early gate.

**Measure cost as it accrues.** I asked several times how many tokens the project
had used, and the answer always needed an audit. Per-run cost records, budget caps,
and routing rules arrived as reactions to waste rather than as part of the design.

## How I would start the next one

1. Write the goal document first: the user, five situations they face, and what
   evidence would show each one is handled.
2. Scaffold the architecture with its boundary tests and a size ratchet before any
   feature work, and run the complete test suite as the merge gate from the first
   commit.
3. Run every agent in a one-shot, worktree-isolated session. The harness, not the
   agent, commits and merges.
4. Keep the backlog and stop rules in the repository, and require every completed
   item to move to an archive in the same commit as its implementation.
5. Review on a schedule with an adversarial persona whose findings must cite
   evidence.
6. Put a person in front of the product every week, because the agents' best
   evidence of usability was still a script pretending to be one.

The experiment did not produce a shop-ready product. It did produce a working
answer to the question I started with. Agents can carry a product a long way
without me, as long as I spend my attention on the goals, the definition of done,
and the gates, not on the code.
