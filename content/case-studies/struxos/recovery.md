---
title: "Failure and recovery"
description: "A rejected edit, an interrupted worker, and a red-main incident. Real gates and Git operations, recorded as a two-minute evidence replay."
order: 6.75
---

## What is recorded

This is a captioned replay built from a real local run on small fixtures. I
deliberately injected the bad edits and terminated a worker subprocess. A live
GPT-6.1 Sol worker performed the two repairs through Conductor. The demonstration
is separate from the [controlled benchmark](/projects/struxos-conductor/benchmark/).

[Download the event receipts](/evidence/conductor/recovery-demo-v1.json) ·
[Download the transcript](/evidence/conductor/demo-transcript.json) ·
[Download the video](/media/projects/struxos-conductor/failure-recovery.mp4)

## The two-minute sequence

**0:00–0:24 — Task and ownership.** A release-rule task enters an isolated
worktree. An approval for an older revision must not release the current one.
The agent edits files; Conductor owns commits, checks, and merging.

**0:24–0:48 — Failure and repair.** A scripted fault makes the rule always approve.
The real gate rejects it. Conductor gives the failure and diff to a live model
for repair. Main does not advance while that check is red.

**0:48–1:00 — Verified merge.** The repaired change passes the worktree gate,
the merge gate, and the separate fixture checks. The recorded main commit begins
`21255c524037`.

**1:00–1:24 — Worker interruption.** Another subprocess saves a partial edit,
then receives SIGTERM and exits with `-15`. Conductor persists the diff and failure
reason before removing its worktree. A fresh process loads that record; the saved
and loaded diff hashes match. A live model completes the material-reservation
task, which passes the separate checks and merges at `50d9c26f674b`.

**1:24–1:48 — Red main and restart.** A deliberately broken main creates a durable
stop and local alert. No external notification is delivered in this test; the
receipt records that explicitly. A new process still sees the stop. Dispatch is
blocked, and an attempted recovery while the gate remains red is rejected.

**1:48–2:00 — Verified recovery.** The operator restores the earlier verified
commit. A fresh gate passes, the commit is unchanged across verification, and the
durable stop is cleared. This final restore is an explicit operator action, not
an autonomous repair claim.

## What changed in Conductor

The historical failure was easy to miss: health checks could report red main for
months without becoming a stopping condition. An unset alert destination meant
nobody was actually notified.

The follow-up gives that failure an explicit state:

- **Durable stop:** the state is atomically written and flushed to disk. A corrupt
  incident record also blocks dispatch.
- **Local alert receipt:** the incident is recorded before external delivery is
  attempted. Missing delivery is visible and does not undo the stop.
- **Dispatch inhibition:** code, audit, deployment, and manual generator dispatch
  cannot proceed through the daemon while the incident is active.
- **Explicit recovery:** the authoritative gate must pass, and the main commit
  must remain unchanged during verification. A later periodic green result does
  not silently clear an incident.
- **Interrupted-work evidence:** partial tracked and newly created files are
  captured in a diff before cleanup. The next attempt gets the saved failure and
  bounded diff in its prompt. A full interruption patch is retained locally.
- **Startup verification:** startup checks actual main with the full gate. It
  no longer treats a matching remote ref as proof of green or silently resets
  main to an assumed-good commit.

The source snapshot passed 352 tests before these changes. The updated suite
passed **367 tests**, including benchmark checks and new recovery regressions.
Tests cover undelivered alerts, notification exceptions, corrupt state, gate
exceptions, stale green results, blocked dispatch, and interrupted-work preservation.

Integration also exposed an existing race: Git could remove worktree metadata
while another worker was scanning it. The first integration run finished with
360 tests passing and that parallel-worktree test failing. I reproduced the
failure, serialized the short metadata operations, and added a regression test.
The final integrated checkout passed all 362 tests; the separate evaluation
checkout includes five additional benchmark tests. Forty repeated parallel
batches then verified all 480 fixture tasks. These are harness tests, not extra
model benchmark results.

[Download the integration verification receipt](/evidence/conductor/integration-verification.json).

## Boundaries

The video shows fixture-level reliability, not a running fabrication shop. The
worker interruption is handled by a surviving harness; this is not proof of
recovering every possible host power-loss or daemon-kill timing. The stop blocks
new daemon dispatch; it is not a claim that arbitrary external processes cannot
change the repository. No real email, chat, or paging alert was sent during this
demonstration, and no external shop pilot was performed.
