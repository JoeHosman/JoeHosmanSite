---
title: "Evidence and open questions"
description: "Where the account comes from, how strong each kind of evidence is, and what still needs a real operator."
order: 5
---

## What was reviewed

This case study combines my account of the experiment with the local StruxOs
repository, selected development sessions, a local transcript collection,
Conductor's source and design notes, and an audit of retained token records.
The review took place on September 27, 2026 Central time (September 28 UTC for
the token-audit export).

Codex supplied inspectable session content and usage records. Claude history
metadata confirmed activity, but matching Claude response logs were unavailable.
The case study therefore does not claim to reconstruct every Claude decision or
the entire experiment from complete records.

## Sources behind the chapters

The source projects and detailed sessions are not public downloads. The pointers
below make the basis of the account explicit without publishing raw conversations,
credentials, or private source code.

| Evidence | Source record | Role in this account |
| --- | --- | --- |
| Product architecture | StruxOs `README.md`, application source layout, initial commits beginning May 23 | Establishes the stack and implemented application structure. |
| Pilot operating path | `docs/pilot/one-week-shop-pilot-runbook.md` | Defines the narrow shop-to-field workflow and distinguishes rehearsal from a real pilot. |
| Early gap assessment | May 31 scenario-library verdicts and shop-floor walkthrough | Records 28 scenario verdicts; explicitly a code/copy review, not a live operator study. |
| Shop-tour translation | `docs/audits/shop-tour-derived-real-workflows.md`, completed-todo archive, and timed local transcript | Connects an identified shop-tour video to specific backlog rules. |
| Automated run results | June 5, June 23, and June 27 Codex tool outputs | Supplies actual recorded pass counts for the test classes discussed in the validation chapter. |
| Later situation checks | `docs/pilot/script-catalog.md` and `next-situation-proof-demos-docker.spec.ts` | Shows API-driven scenario execution and browser assertions of reopened records. |
| Screenshot | Saved repeat-family mockup test artifact, with July 6 test data visible | Illustrates a test evidence card. Names, identifiers, and approval data are generated fixtures. |
| Remaining pilot checks | `docs/audits/pilot-readiness-todo.md` | Lists manual role, lifecycle, restart, and physical-record checks still to perform. |
| Harness | Conductor's June 20 design and task/cycle implementation | Establishes the intended orchestration and inspected implemented mechanisms. |
| Token accounting | Local extraction and independent fork-deduplication verification | Produces the published aggregate numbers and documents missing coverage. |

The June 27 API result is a filtered aggregate of **41 passes** across several
classes. The June 23 consumable results are two separate **2-pass** runs. These
are dated execution records, not a claim that those suites were rerun during
this portfolio review. The full StruxOs application was not rebuilt or field-tested
as part of preparing these pages.

## What counts as evidence of usability?

Different checks answer different questions:

- **Code and copy review:** can identify a missing concept or confusing label.
  It cannot show that a browser flow works.
- **Unit or controller tests:** can establish a rule under controlled inputs.
  Fake stores and generated records limit what they say about real operations.
- **API-backed browser scenarios:** can establish backend transitions and that a
  screen displays persisted results. They may bypass the UI for the actions
  a human would need to perform.
- **A full role-based walkthrough:** would establish more about discoverability
  and completion through the interface. It still differs from work under shop-floor pressure.
- **A real shop pilot:** would test the system against actual people, material,
  equipment, interruptions, and physical records. No completed external pilot
  was found in the reviewed evidence.

## What would make the next phase convincing?

The repository's remaining manual checks provide a concrete next evaluation:
walk the application as each shop role, verify the first screen and next action,
complete a package through the entire lifecycle, restart the stack, and compare
the recovered state with the physical traveler and receipt.

A useful pilot would retain both successes and failures: which actions required
developer help, where people left the system to resolve ambiguity, whether held
work could move incorrectly, and whether saved state survived normal interruptions.
Those observations would support a stronger usability claim than another feature
count or agent-generated readiness percentage.

## The conclusion the evidence supports

I built a substantial prototype and an agent-work harness. The records demonstrate
specific operational rules, recorded automated runs, and a progression toward
more realistic scenario checks. They also demonstrate the need for human course
corrections and stronger tests of usability.

The project remains paused. “Industry-leading” describes the original ambition;
it is not a verified market position, customer outcome, or production-readiness claim.
