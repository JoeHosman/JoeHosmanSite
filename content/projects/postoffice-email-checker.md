---
title: "PostOffice: coordinating a mass email checker"
summary: "A 2008 requirements draft and interface mockups for distributing mailbox checks, finding new messages, and notifying the people who needed them."
date: "2008"
categories: [software, process-automation]
featured: false
draft: false
---

## Too many inboxes to check by hand

At [StarSoft Systems](/career/starsoft-systems/), important ticket-registration
messages could arrive across thousands of email accounts. Someone needed to
find them in time to act. Opening each inbox by hand wasn't going to work.

I built a checker that handled roughly 12,000 Gmail accounts, looked for
specific messages, and extracted the relevant information into a list for my
boss. I also kept this requirements draft from 2008 for a new version called
**PostOffice**, covering both Gmail and Yahoo accounts.

The draft describes the features and administration screens I wanted for that
version. The screenshots here are interface mockups with example data. Their
account counts aren't measurements of the running system.

## Three pieces with different jobs

The design split the work into three applications. **PostOffice** would
coordinate assignments, receive new messages, and evaluate notification rules.
**PostWorkers** would check their assigned accounts and report results and
errors. The **administration tool** would let an operator manage accounts,
workers, schedules, and alerts.

That separation gave each part a clear job. The person running the system
needed to know whether mail was being checked, how much work was left, and
whether anything needed attention. They shouldn't have to open each worker
to find out.

[![PostOffice status mockup showing recent message subjects, account and worker totals, queue size, and check times.](/images/projects/postoffice-email-checker/status-mockup.webp)](/images/projects/postoffice-email-checker/status-mockup.webp)

*The proposed status screen, populated with example subjects and counts.*

## Spreading out the work

The specification called for scheduled checks and an option to check selected
accounts on demand. Each worker would maintain a queue and process accounts
concurrently, while the coordinator kept track of assignments.

I included ways to add workers and redistribute accounts as the workload
changed. Removing a worker also meant moving its account assignments and
recent message history, so the replacement worker could recognize messages
that had already been seen.

[![PostWorker administration mockup listing workers with account assignments and queue counts, plus controls to add, remove, and redistribute workers' accounts.](/images/projects/postoffice-email-checker/workers-mockup.webp)](/images/projects/postoffice-email-checker/workers-mockup.webp)

*The worker-administration mockup made assignments and outstanding work visible
in one place. All values shown are examples.*

## Finding the messages that mattered

Downloading a message was only part of the job. The proposed workers would
check for previously seen messages before reporting new ones. PostOffice
would store those messages centrally, then apply rules to the subject or
message content to decide who to notify by email or SMS.

Those alerts were meant to reduce the need for someone to sit and watch the
checker. The draft explicitly left real-time notification out of scope;
new-message alerts would follow scheduled or requested checks.

## Giving the operator useful controls

The account screens covered adding and removing accounts, changing account
information, filtering by provider, and seeing when an account was last
checked. I also included a bulk-import screen because entering accounts one
at a time wasn't practical for this workload.

[![Account-administration mockup listing placeholder email accounts, their providers, and last-checked times.](/images/projects/postoffice-email-checker/accounts-mockup.webp)](/images/projects/postoffice-email-checker/accounts-mockup.webp)

*The account-list mockup, using placeholder addresses.*

[![Bulk account-import mockup with an example file loaded and a list of placeholder Yahoo addresses.](/images/projects/postoffice-email-checker/bulk-import-mockup.webp)](/images/projects/postoffice-email-checker/bulk-import-mockup.webp)

*The proposed bulk-import screen, also using example data.*

I wrote the requirements around the people using the tool: the person keeping
the workers running and the boss waiting for useful results. That meant
thinking through the routine work around the checker, including account
imports, failed checks, scheduling, and knowing which messages were new.
The draft preserves that design work, including features that were still
being specified.
