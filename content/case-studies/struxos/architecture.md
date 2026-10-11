---
title: "Clean Architecture under agent pressure"
description: "Adversarial reviews, architecture tests, and a maintainability ratchet kept the layers clean. They did not stop the god objects from growing."
order: 4
---

## Why insist on Clean Architecture?

I required Clean Architecture from the first scaffold, and repeated it in goals
("uncle bob's clean architecture is a must!"). The reasoning was practical. Agents
work best on code they can understand in a small context: a use case that
depends only on domain rules and a port can be changed and tested without loading
the whole system. Clear boundaries were meant to keep each agent's change local,
and to make "where does this belong?" a question with a checkable answer.

StruxOs has four projects, with dependencies pointing inward:

| Project | May depend on |
| --- | --- |
| `StruxOs.Domain` | nothing |
| `StruxOs.Application` | Domain |
| `StruxOs.Infrastructure` | Application and Domain |
| `StruxOs.Api` (composition root) | Application and Infrastructure |

Each layer has its own test project.

## Uncle Bob as an adversarial reviewer

The most reused review prompt in the project was a persona: Claude, asked to
review the code as Robert C. Martin might. The persona was a prompting device;
he had no involvement. It ran on a timer in the first week,
in numbered passes on particular concerns ("pass 5 on concurrency and locking"),
and again whenever I suspected the work had drifted. On June 19 I asked for it
plainly: "pretend to be uncle bob and give this code base an advisory review.
Use sub agents to parallelize... tell me the truth."

The May 31 review is worth quoting because it was both fair and harsh. It credited
the structure, "The Dependency Rule is honored at compile time," and then summed up
the problem: "You drew the right boxes and then put the logic in the wrong box...
islands of craftsmanship in an ocean of God Objects." Its baseline:

| Finding | Size at the May 31 review |
| --- | --- |
| In-memory prefab service | 13,457 lines and 317 methods behind 109 interfaces |
| Prefab controller | 3,398 lines, 240 actions, a constructor taking about 80 arguments |
| Main prefab Vue panel | 12,269 lines |
| Main client test file | 12,515 lines |

The June 19 review used eight parallel reviewer agents (backend architecture,
frontend, tests, domain, security and reliability, API contracts, and others). It
produced the refactoring epics that Conductor later worked through.

## Turning reviews into gates

A review is advice; an agent working alone at 3 a.m. needs a rule it cannot ignore.
Three mechanisms turned the reviews into checks that ran on every change:

- **Architecture tests** (June 17). Fifteen reflection and source-scanning tests
  verify the dependency rule, keep infrastructure types out of application ports,
  and keep controllers away from persistence types. Several are *ratchets*: once a
  responsibility was extracted from the large prefab use case, a test asserted that
  it stayed out, so a later agent could not quietly move the logic back.
- **A maintainability ratchet** (June 19). A script records the largest file,
  interface, method, and Vue section, and fails if any of them grows past a
  committed baseline. Agents updated the baseline in 164 commits, tightening it
  after each refactor.
- **Conductor's merge gate.** Every change had to pass all four .NET test projects,
  the Vue type-checker, and the client tests on the merged result before main
  advanced.

![Six-step diagram: an adversarial review; a finding that must cite a file, line range, and command or be discarded; a todo epic; an agent slice that extracts one responsibility and deletes the old copy; a ratchet test asserting the responsibility stays out; and the merge gate running that test on every later change. A return arrow shows that a later change moving the logic back is rejected.](/images/projects/struxos-conductor/review-to-ratchet.svg)

*How a review finding became a rule no later agent could quietly undo. The
review is advice; the ratchet test in the merge gate is what made it stick.*

## What improved, and what did not

| Measure | First baseline | Latest |
| --- | --- | --- |
| Largest interface | 129 members | 40 members |
| Largest Vue template or script section | 8,918 lines | 6,827 lines |
| Dashboard panel | 6,170 lines (May 30) | 960 lines the same day, 1,347 today |
| Main prefab Vue panel | 12,269 lines | 4,940 lines |
| In-memory prefab service | 13,457 lines in one file | 20,928 lines across 38 partial-class files |
| Largest method | 1,112 lines | 1,112 lines |

The interface and component work was real decomposition: in one day Claude
extracted 42 composables and several sub-components from the dashboard in 63 small
commits. The backend's largest class is another story. It was split into 38 files,
which satisfied the file-size ratchet, but it kept growing. A partial class split
across files is still one class. The ratchet measured the thing I could
measure easily, and the agents improved exactly that measure.

![Line chart from May 24 to June 20, 2026. The backend ratio of test lines to code lines jumps from about 0.3 to about 0.55 on May 29 and stays between 0.53 and 0.59; the whole-repository ratio rises from about 0.12 to about 0.23.](/images/projects/struxos-conductor/test-ratio.webp)

*Test lines per line of code, through June 20. The tests kept pace with the
backend. Many of them sit in a few very large files; the main client test file
reached about 17,500 lines.*

## Gates only protect what they cover

Two enforcement gaps are visible in the history:

- A pre-push hook that ran the fast test suite was committed on May 29 but never
  activated, because the repository was not configured to use the committed hooks
  directory. The post-project review caught it; nothing during the
  project did.
- Conductor's first merge gate ran only the Domain and Application tests. The
  Infrastructure and Api tests quietly rotted until June 24, when adding them to the
  gate surfaced one real bug and about eighteen stale tests.

The project's only CI workflow, added on July 5, runs Python coverage audits. It
does not build or test the application. In practice the architecture was protected
by whatever the active agent harness ran, and by nothing when no harness was running.

## A review that invented its findings

One review artifact was discarded. On June 19 two exploration agents were
interrupted mid-run, and their replacement "openly reconstructed findings from
memory." The document records its own invalidation: every proposed finding must
now cite a live file, a line range, and the command used to verify it. With that
rule in place the accepted findings list read "None yet." I count that as the
system working: the rule caught a plausible review with nothing behind it.

*Quotations from my prompts keep my wording, with spelling corrected.
Evidence: project references and architecture tests; the May 31 review and the
June 19 advisory; the maintainability ratchet baseline and its history; Conductor's
gate configuration and commit history; a line count of current files. See the
[evidence notes](/projects/struxos-conductor/evidence/).*
