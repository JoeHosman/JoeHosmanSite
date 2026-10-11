---
title: "How the experiment progressed"
description: "Six weeks in five eras: Codex scaffolding, Claude goal sprints, an unattended Pi loop, Conductor, and a final round of human-directed cleanup."
order: 2
---

## The ambition and the recorded history

I began exploring the idea in early 2026. The repository history begins on
May 23 and its last commit is July 6. Those are different statements: my
recollection establishes the broader starting point; the repository, my prompt
history, the agents' memory files, and the session logs establish the dated
events discussed here.

Three kinds of agent wrote the code, and the mix changed as I changed the harness:

- **Claude Code** (Opus 4.7, then Opus 4.8, and Fable 5 at the end) signed 1,265
  commits with a co-author trailer, mostly between May 29 and June 5.
- **Pi**, an open-source coding agent I ran with OpenAI's gpt-5.5 model, drove an
  unattended loop from June 9 to June 21.
- **Codex** did the early scaffolding interactively and then, as Conductor's
  worker, ran about 2,300 headless sessions between June 21 and June 27.

![Stacked bar chart of daily StruxOs commits coloured by source, showing distinct eras: Claude Code bursts at the end of May and early June, the Auto Pi identity in mid-June, and Conductor's Codex workers from June 21 to 27.](/images/projects/struxos-conductor/commits-by-harness.webp)

*Commits per day by inferred source. From June 14 every commit was made under a
"StruxOs Auto Pi" git identity, so that colour also contains a few later
interactive commits.*

![Diagram in three stages. Late May: Claude's review findings go to me, and I paste them into Codex as prompts; Codex commits to main. Mid-June: a loop script sends "continue" to a fresh Pi session that reads and updates control documents I write, and commits to main after a test script. Late June: I write the plan; Conductor sends one task to a Codex or Claude worker, receives a diff, and merges to main only if the gate is green.](/images/projects/struxos-conductor/who-relays-the-work.svg)

*Where I sat in each era. The project's real progression was not the agents
getting smarter; it was the relay between them moving from me, to a script, to
a harness that could refuse a change.*

## Era 1: Codex scaffolds, Claude reviews (May 23–28)

Codex built the first Clean Architecture scaffold with me in conversational
slices: identity administration, organizations and projects, .NET 10, a
TypeScript client, and the first fabrication and logistics screens. On May 24 I
brought Claude in as a reviewer. My first request was for it to "act as Uncle Bob
and do code review for Clean Architecture on this project every 15-30 minutes"
on a `/loop`, and I pasted its findings into Codex by hand.

Within a day I had asked Claude to skip me: "at the end of each result; call
codex directly with what to do." I also asked Codex whether there was a way to
have it keep looping. The goal of removing myself from the relay was there from
the start.

## Era 2: parallel goal sprints (May 29 – June 5)

This was the peak of my direct involvement: 192 prompts to Claude and 153 to Codex
in a single week, and 2,071 commits. Two to four Claude sessions ran at once
alongside Codex. My prompts moved from `/loop` to `/goal`, and the goals became
short pointers into a milestone list ("/goal keep trucking to m250"). The
[goals chapter](/projects/struxos-conductor/goals/) describes that pattern.

Running agents in parallel in one working tree produced a fast series of
collisions, and each one became a standing rule in Claude's memory:

| Date | What went wrong | The rule I gave |
| --- | --- | --- |
| May 29 | Agents swept each other's files into commits and extracted the same component twice | Work in a separate git worktree whenever another agent is active |
| May 29 | Finished work sat unmerged on a branch, invisible to the other agents | Rebase, test, and fast-forward merge to main at the end of every iteration |
| May 30 | Changing directory before commands triggered permission prompts | Use absolute paths and `git -C`; never `cd` first |
| May 31 | Agents kept adding in-memory persistence that hid real database behavior | No new in-memory persistence; use the Docker PostgreSQL and MongoDB |

On June 3–5 Claude dispatched about 30 sub-agents, each in its own short-lived
worktree, to work on separate tracks such as the work-package state machine,
repeat-family assemblies, and the station shell.

![Gantt-style chart of 43 git branches between May 30 and June 5, 2026. A diagonal staircase of short green bars labelled worktree-agent shows parallel sub-agent branches created and merged on June 4 and 5.](/images/projects/struxos-conductor/branch-lifetimes.webp)

*Branch lifetimes through June 20. Each `worktree-agent` bar is one parallel
Claude sub-agent; almost all merged within an hour.*

## Era 3: the unattended Pi loop (June 9–21)

To keep work going without me, I switched to Pi and drove it with scripts. The
first version was an Expect script that watched Pi's terminal and typed a
"continue" message when output went stale. The second ran one fresh,
non-interactive Pi session per batch inside tmux, and left all state in
repository control documents. Over 13 days the scripts sent about 3,350 prompts;
the most common, sent 1,268 times, was "continue with the next goal that will
bring us closer to a real shop using this."

This era produced the experiment's clearest failure: hundreds of commits that
added static on-screen "cues" which looked like features but changed no
behavior. It also produced the fix: written stop rules, a definition of
"workflow-complete," and architecture tests that locked in each refactor.

## Era 4: Conductor (June 20–29)

On June 20 I asked Claude to help me build "our own agentic automation" that
would take my todo files and audit scripts and "run continuously without my
input." The design and five implementation plans were complete about nine hours
later. Conductor then landed about 1,040 tasks in a week, peaking at 299 in one
day. On June 26 I redirected it from internal refactoring toward a concrete
product target: a fabrication shop using StruxOs for a week on a small project.
Shortly after, the main branch went red, the automatic fix failed, and the loop
went quiet. The [harness chapter](/projects/struxos-conductor/harness/) covers
what happened in detail.

## Era 5: situation scripts and cleanup (June 28 – July 6)

The last stretch was interactive again. With Codex I turned the one-week pilot
runbook into Playwright runs I could watch, then ran a loop of "audit for gaps,
fix those, iterate until no more gaps" across a catalog of shop situations. With
Claude I attacked the interface itself. I wrote that StruxOs "was built by
claude/codex without much UX guidance" and had become "giant views of endless
scrolling." The final commits introduced a "control room, not scroll"
layout doctrine and viewport-height budgets; for example, the field-receiving
page went from about 9,100 pixels tall to about 1,300. The project paused after
July 6.

## Hands-off was the question, not the entire history

The records do not support a story in which I gave one prompt and never
intervened again. Across the project I typed 597 prompts to Claude and 549 to
Codex. Many were nudges ("continue," "do next thing"), but the ones that changed
the outcome were domain corrections and changes to the standard of proof:

- "location is mostly for scheduling. assembly goes past level and rooms (same
  bathroom can appear all over a building)"
- "Everything the shop builds is from an IFC or Revit model"
- "not every shop uses the same governance lanes and flow"
- Use Playwright to walk the shop page as a fab worker would, not just pass
  component tests
- "why are we mocking and not using real api and database?"

The autonomy was inside a directed process. I treated the agents the way I would
treat a fast, literal-minded team: they could investigate, implement, test, and
continue across many steps, while I owned the domain model, the goal, and the
standard of proof. When the numbers looked good but the product did not, I said so.
On June 26 I wrote, "okay, i feel like we've gone backwards," and that judgment is
what redirected Conductor from internal refactoring to a shop pilot the same day.

## Why validation had to change

An early actor audit could pass while using mocked responses. A workflow script
could prove backend transitions by calling APIs without proving that a shop
worker could find the same actions in the interface. A green component test
could confirm expected labels while the live application still had confusing
navigation or empty state.

The development history shows a recurring response to those problems: expose a
real command in the interface, connect it to stored state, run the scenario again,
and retain evidence of the result.

## The practical lesson in the records

Keeping agents busy was easier to measure than making the product usable.
The useful unit of progress was a workflow that survived a specific situation,
not a count of screens, commits, or tokens. The records support that distinction
even where they do not settle the product's readiness for a real shop.

*Evidence: repository commit history and trailers; my Claude and Codex prompt
history (quotations keep my wording, with spelling corrected); Claude's project
memory files; Pi session logs; Conductor's ledger. Dates
and source boundaries are documented in the
[evidence notes](/projects/struxos-conductor/evidence/).*
