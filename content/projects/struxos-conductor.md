---
title: "StruxOs and Conductor: an experiment in hands-off development"
summary: "Exploring how far Codex and Claude could take a product using goals, transcript-based scenarios, and a continuous refinement harness."
date: "2026"
categories: [agentic-development, software, process-automation]
status: paused
featured: true
draft: false
cover: ""
cover_alt: ""
---

## The question

At the beginning of 2026, I wanted to understand how hands-off agentic
development might work. I gave Codex and Claude an ambitious target: build an
industry-leading project management tool without my directing each development
decision.

I used goal-driven sessions, including `/goals`, to explore how much of the
planning and implementation the agents could carry forward on their own.

## Giving the agents situations to work against

I introduced YouTube video transcripts as source material for situations the
product should handle. Those situations gave the agents something more concrete
to validate against than the broad instruction to build a great product.

The StruxOs project developed into a construction and prefab-workflow prototype.
Its documented target follows work from project setup and fabrication release
through materials, station work, quality assurance, loadout, and field receiving.
The scenarios include disruptions such as missing materials, design revisions,
quality holds, and damaged deliveries.

The application uses an ASP.NET Core backend and a Vue/TypeScript frontend,
with Docker-based development and verification workflows.

## Building the refinement loop

As the experiment developed, I had the agents build Conductor, an agentic
harness for continually refining the project.

Conductor adds a Python execution loop around the workers. It reads queued work,
routes tasks to workers, and records outcomes in a persistent ledger. Its control
loop supports pausing, resuming, and tracking cycles across restarts. The design
also brings together named plans, audit-generated work, and verification gates.

## What the experiment produced

The work produced both a product prototype and a harness for continued agent-led
development. The original industry-leading target remains the ambition that
framed the experiment; the project story is about investigating the development
process and the role of scenarios, goals, and feedback within it. The experiment
is currently paused.
