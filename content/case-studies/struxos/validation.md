---
title: "From shop tours to executable checks"
description: "How transcript observations became product rules—and what the resulting tests do and do not prove."
order: 3
---

## A transcript supplied situations, not a stamp of approval

The shop-tour-derived backlog names Shapiro & Duncan's video *2020 SHOP TOUR—
Prefabrication of Piping Assemblies* as a source. The local transcript preserves
timed segments, but the reviewed record does not include the original video URL.

The useful step was translation: take an observed practice, identify the decision
or failure it implies, implement a rule, then test that rule. The video did not
validate StruxOs itself. It helped define situations against which the software
could be evaluated.

## 1. Approve a mockup before repeating it

**Observation, about 9:21–9:45 in the transcript:** a highly repetitive project
benefits from reviewing a mockup against installation and owner expectations.

**Product rule:** a repeat family can require a recorded mockup decision before
new instances are created from its template. The implementation records an
approver, time, comments, and production decision.

**Executable check:** the API test requests an instance before approval and
expects rejection, records approval, then expects the instance to be created.
A June 27 session records **41 passing tests and no failures** in a filtered API
run that includes the repeat-family, worker, transition, and cut-label classes.
That is an aggregate result, not 41 mockup tests.

The browser scenario also makes the distinction visible: it drives the setup and
approval through APIs, opens the application's evidence view, reloads it, and
checks the record again. The saved screenshot below shows that view.

![Recorded StruxOs test evidence card showing mockup approval and a reopened backend record.](/images/projects/struxos-conductor/mockup-evidence.png)

*Saved test artifact containing generated project records and a synthetic approver.
This is an evidence card captured by the test, not a photograph of a customer
approval or proof that an operator performed the whole workflow through the UI.*

## 2. Know who took consumables and where they went

**Observation, about 10:01–10:23:** employee-ID-based supply dispensing makes
consumption attributable and can reveal repeated replacement patterns.

**Product rule:** capture the employee, item, station, and work order when supplies
are issued, and provide a management query for consumption patterns.

**Executable check:** the command-service tests verify that a valid issue is
written with normalized fields and that an issue lacking an employee is rejected
without a write. A June 23 session records **2 passed, 0 failed**. A separate
query-service run that day also records **2 passed, 0 failed**.

Those tests use recording/fake stores. The query tests establish delegation and
default parameters; they do not establish successful waste detection in a real
shop. No physical vending-machine integration is demonstrated by this evidence.

## 3. Preserve identity from cut to label

**Observation, about 3:31–3:54:** work orders reach a saw, stock is optimized, and
each cut receives a label.

**Product rule:** maintain a shared identity between the cut traveler and its QR
label, preserve package and station information, and support reprinting.

**Executable check:** controller tests verify shared identity and print payloads,
reprinting after cutting, and rejection when the package or cut is missing. These
classes are included in the June 27 API run. A June 5 session also records
**32 passing tests** across worker, transition, and label classes.

That earlier run predates the later transcript-derived backlog. This is a case
where the shop tour corroborated and helped develop an existing feature; it would
be misleading to credit the transcript with originating all of it. The checks
also do not demonstrate a physical printer or saw being operated.

## 4. Missing material should stop a station start

**Observation, about 6:25–6:49:** receiving includes quality checks and sorting
material into bins for workstations.

**Product rule:** connect material identity, required quantities, received
quantities, verification, and workstation assignment. Block station work until
required material has been verified.

**Executable specification:** a controller test attempts to start seeded work,
expects a conflict, verifies the required receiving bins, then expects the start
to succeed. The test source and maintained command filter are present. This
review did **not** locate an independently attributable passing run for that
specific test, so it is recorded as test coverage in source rather than a verified
historical pass.

## How usable was it?

The evidence supports implemented workflow rules, automated checks of several
important transitions, and browser views that display and reopen test records.
The script catalog covers additional situations such as wrong revisions,
mixed-package loads, damaged receipts, and revoked QA passes.

It does not establish a successful week in a customer shop. The pilot-readiness
notes still call for manually walking the full path with each role, checking
state after restart, and comparing the software's records with physical travelers
and receipts. The early May 31 review was explicitly based on code and copy,
not a live browser walkthrough; its **3 answered, 13 partial, and 12 missing**
verdicts are a historical baseline, not a current readiness score.

The strongest conclusion is specific: scenarios helped turn vague product goals
into rules whose behavior could be checked. Whether real operators could rely
on the entire product remains a separate, unproven question in the reviewed records.

*Sources and verification boundaries: [evidence notes](/projects/struxos-conductor/evidence/).*
