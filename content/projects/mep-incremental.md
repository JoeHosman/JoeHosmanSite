---
title: "MEP incremental game"
summary: "A browser progression game about growing electrical, plumbing, and mechanical work from manual tasks into coordinated production."
date: "2026"
categories: [game-development, software]
status: prototype
featured: false
draft: false
cover: ""
cover_alt: ""
---

I built this browser prototype around mechanical, electrical, and plumbing work. The opening action is deliberately small: choose a trade, perform a manual task, and earn the first few dollars. The source extends that beginning into parts purchasing, preparation, installation, workers, research, and the ongoing cost of keeping the operation running.

The project is called `fabbing` in the source workspace. I use “MEP incremental game” here as a descriptive title. It is a separate React and TypeScript implementation within my [Missouri Video Game Company LLC](/projects/missouri-video-game-company/) work, alongside the spatial shop simulation in Fabrication Empire.

![Electrical onboarding screen showing a twelve-dollar cash ledger and the action Drive screws on an outlet.](/images/projects/mep-incremental/onboarding.png)

*Electrical onboarding after twelve manual actions in a local browser check. This capture shows the opening stage of progression.*

## Starting with the work

The three starting trades have their own first action. Electrical begins with driving screws on an outlet, plumbing with sweating a copper joint, and mechanical with tightening HVAC fasteners. Each gives the player an immediate connection between an action and a cash increase before the more involved production systems come into play.

Jobs separate preparation from installation. An outlet, fitting, or duct section has a raw input, preparation time, installation time, storage limit, and payout. Higher-level jobs can consume prepared output from other jobs. That gives the production model a way to represent dependencies across the operation instead of treating every purchase as an isolated income increase.

Workers take roles in buying, preparing, and installing. Hiring depends on accumulated manual experience as well as affordability. Automation therefore grows out of the activity the player has already performed. Research, training, and license upgrades provide additional progression, while tools have ownership tiers and a remaining-use count.

## Making automation carry its costs

I kept the game state and time advancement in a dedicated engine. Its state distinguishes raw parts, prepared products, active manual tasks, workers, orders, payroll, and progression. A tick advances production using elapsed time, available inputs, storage capacity, and the relevant modifiers. React presents the resulting state and player actions.

The worker loop checks whether a trade has missed payroll before allowing its automation to continue. Payroll is calculated from the workers owned in that trade, and the state tracks missed cycles. This makes cash management part of maintaining production. Buying additional capacity creates another recurring obligation.

The job definitions also distinguish manual failures from automated waste. Simple first-tier manual jobs have no failure chance, while worker output can be reduced by an expected waste rate. Research can change those rates and penalties. This keeps the same job data useful for both hands-on work and continuous production without pretending that the two processes are identical.

## What the review established

In the local browser check, I selected Electrical and performed twelve manual actions. The cash ledger increased from zero to twelve dollars, and the page produced no observed errors. That check covers the opening interaction, not the later hiring, research, payroll, or long-term progression loops.

Those broader systems are represented in the retained implementation. Useful source references are `fabbing/src/engine/GameEngine.ts`, `fabbing/src/engine/jobs.ts`, `fabbing/src/engine/trades.ts`, and `fabbing/src/engine/payroll.ts`. The project remains presented here as a prototype, with the distinction between the observed opening experience and the larger source-defined game kept explicit.
