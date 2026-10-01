---
title: "Fabrication Empire"
summary: "An isometric fabrication-shop simulation where material dimensions, workers, equipment, and customer deadlines shape the production floor."
date: "2026"
categories: [game-development, software, process-automation]
status: prototype
featured: false
draft: false
cover: ""
cover_alt: ""
---

I built Fabrication Empire as a browser management-game prototype about running a fabrication shop. The player arranges equipment, hires workers, moves stock through production, and ships finished work. The management problem comes from how those activities interact: a machine needs an operator, its inputs occupy space, and a finished part still needs a route to the shipping dock.

This is part of my work through [Missouri Video Game Company LLC](/projects/missouri-video-game-company/). It brings physical production, scheduling, and operating costs into a TypeScript simulation with an isometric Canvas presentation.

![Fabrication Empire sandbox with an isometric shop floor, machine labels, shipping docks, and a construction toolbar.](/images/projects/fabrication-empire/sandbox.png)

*The local prototype in sandbox mode. The visible shop includes cutting, welding, sheet-metal equipment, storage, amenities, and shipping bays.*

## From a shop layout to a production problem

The sandbox presents a shop the player can inspect and change. Production chains connect raw materials to processing and assembly. Pipe can move through cutting and welding; sheet stock can pass through a plasma table and press brake. Workers and handling equipment connect those stations, so buying another machine is only one part of increasing output.

Material size makes that layout consequential. A long or heavy part changes the handling requirement, the space needed for staging, and the capacity it occupies during transport. I derive those properties from material geometry while allowing authored values to override them for game balance. Forklifts, cranes, conveyors, and workers provide different ways to move work through the floor.

Customer contracts add demand, deadlines, and payouts. The contract board associates deliveries with the appropriate customer and draws replacement work when contracts conclude. Quoting a price also enters the calculation: the code tracks different bid levels and incorporates the accepted quote into the eventual payout. Production becomes a sequence of decisions about what work to accept and how to fulfill it.

## Connecting geometry, people, and money

I structured production routing around recipe data. I derive the chain of inputs required by a product, which allows the same machinery to support different authored production chains. Geometry feeds logistics calculations, and the world simulation manages machines, workers, trucks, and their changing state.

Contracts and operating expenses sit in separate modules that observe the world. That separation makes their rules easier to inspect independently of drawing the shop. Weekly expenses include payroll, rent, utilities, and insurance; maintenance and consumable purchases can affect cash as they happen. A busy floor still has to cover its costs.

Workers and equipment add further constraints. Retained source includes machine wear, preventive maintenance, worker morale, training, certifications, injuries, and supply consumption. These systems give the player more variables to manage, while also creating engineering work around consistent state transitions and shared calculations. For example, a common payout function supplies both the contract result and its displayed value.

## Where I left it

During the September 2026 portfolio review, the browser application loaded locally and entered its sandbox without observed page errors. The screenshot comes from that check. It establishes the running shop interface; it does not establish a completed campaign, tuned economy, or public release.

The rest of the implementation is in the source files below. Representative files are `fabgame/src/world.ts`, `fabgame/src/logistics.ts`, `fabgame/src/contracts.ts`, and `fabgame/src/economy.ts`. Development history inspected for this review includes work through July 2026.
