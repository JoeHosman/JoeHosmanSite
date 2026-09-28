---
title: "What I built"
description: "Two connected systems: software for a fabrication shop, and a harness that kept agents working on it."
order: 1
---

## The product became more specific than the original brief

My starting ambition was an industry-leading project management tool. StruxOs
developed into something more focused: a prototype for coordinating a mechanical,
electrical, and plumbing fabrication shop, from the work released by a designer
to the assemblies received in the field.

That focus matters. A generic task board can say that a job is in progress. A
shop needs to know whether the material is available, the drawing is current,
the worker can perform the operation, and a quality hold prevents shipment.
Those became concrete product questions for the agents to work against.

## Following one package through the shop

The pilot runbook narrows the product to one company, one project, one shop site,
and one work package. The intended operating path is:

1. **Set up the shop.** Establish the company, project, users, roles, and stations.
2. **Release work.** A designer or VDC lead prepares a package with its drawing
   and revision context. VDC means virtual design and construction.
3. **Prepare materials.** Identify shortages, substitutions, and receiving problems
   before work reaches a station.
4. **Build at the station.** A worker follows a traveler, the record that accompanies
   the work through its operations, and records progress or blockers.
5. **Inspect.** QA records a pass, hold, or rework decision.
6. **Load and dispatch.** Coordinate bundles, load plans, and shipment evidence.
7. **Receive in the field.** Record arrival and exceptions such as damage or missing parts.
8. **Review the day.** Follow the package's decisions and handoffs across the roles.

This is the product's organizing workflow. Its existence in a runbook does not
mean a customer has run it successfully. The [validation chapter](/projects/struxos-conductor/validation/)
separates the implemented and tested portions from that stronger claim.

## The application underneath

StruxOs uses ASP.NET Core on .NET 10 for the backend and Vue 3 with TypeScript for
the browser interface. The repository separates domain rules, application use
cases, infrastructure, and API controllers. PostgreSQL and MongoDB appear in the
development stack, which runs through Docker Compose.

The source history includes organization and role administration, fabrication
and logistics workflows, station controls, material-readiness rules, and
scenario-specific checks. These are implemented components, not just a proposed
architecture. Their reliability still depends on the particular route, data, and
test being examined.

## Conductor: the system around the agents

The second product was Conductor, a Python harness built to keep development
moving beyond one interactive conversation. Its documented cycle is to read a
plan, select work, route it to a worker, run it, and record the result.

The code includes task selection, worker routing, persistent outcome records,
cycle tracking, and pause/resume controls. Plans describe ongoing bodies of work;
the design also includes audit-generated tasks, worker limits, isolated workspaces,
and verification before integration. Those mechanisms need to be understood
individually rather than treating “autonomous” as a single on/off property.

Conductor made the experiment about more than code generation. It made work
selection, evidence, recovery, and the cost of repeated context part of the system
I was investigating.

*Evidence: StruxOs README and source layout; one-week shop pilot runbook;
Conductor's June 20 design and its task/cycle implementation. See the
[evidence notes](/projects/struxos-conductor/evidence/).*
