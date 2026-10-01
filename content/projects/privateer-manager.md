---
title: "Privateer Manager: a living maritime simulation"
summary: "A privateer-company sandbox built around a deterministic simulation of ships, trade, cities, contracts, and conflict."
date: "2026"
categories: [game-development, software]
status: prototype
featured: false
draft: false
cover: ""
cover_alt: ""
---

Privateer Manager is my maritime-management prototype under [Missouri Video Game Company](/projects/missouri-video-game-company/). I put the player in charge of a privateer company in a world where ships travel, cities consume and produce goods, contracts appear, and competing forces act on their own.

The player-facing idea is a company inside a moving economy. Sending a ship somewhere is connected to what happens when it arrives: a contract may complete, cargo and money change hands, a subscribed route may continue, or an encounter may interrupt the voyage. Fleet management becomes a sequence of decisions inside a larger simulation.

## One decision inside a moving world

My implementation covers player commands, fleets, contracts, trade-route subscriptions, reputation, and combat resolution. It also gives the surrounding world its own behavior. Pirate and trader AI choose actions, warships have their own movement and return paths, and city systems track economic activity and population.

That creates dependencies between systems. A ship arriving at a city can affect more than its own location. Contract completion influences money and reputation; arrivals contribute to city wealth; damage affects repair time and later encounters. I also added systems for diplomacy, blockades, city emergence, and country balance.

The engineering question I focused on was how to keep those interactions understandable. If every visual object changes the world independently, tracing a surprising result becomes difficult. Privateer Manager concentrates the running simulation's state changes in an explicit tick.

## A simulation with a repeatable input

The core contract is that the same state and commands produce the same next state. The tick avoids clocks, global randomness, and nondeterministic thread behavior. World generation supplies an initial state, commands express player decisions, and the simulation advances from there.

My simulation tick applies commands, runs autonomous behavior, moves ships, processes encounters and arrivals, updates the economy, and advances periodic systems. Rendering reads the resulting state. Serialization handles saving and restoring it. That organization gives the simulation a boundary that can be examined without depending on how the strategic map is drawn.

A small implementation detail illustrates the value of that boundary. Ship removals are deferred until after the movement loop. Removing a ship while iterating the same array can shift the next ship into an already-visited index and skip its update. Collecting removals first keeps a combat or arrival result from accidentally changing which ships receive a turn.

## What is implemented, and what is recorded

I built this in Godot and GDScript, with configuration targeting Godot 4.3. Retained development history runs from April 25 through April 27, 2026. I implemented procedural land and world generation, persistence, a strategic-map interface, and a substantial collection of subsystem tests, including a world-generation determinism test.

Web and Linux export presets are present. I also built a browser-based design-document viewer and a log dashboard; those are supporting tools, not evidence of a published browser game. It is still a prototype.

I built Privateer Manager this way because I wanted autonomous ships and economic systems without making the simulation opaque. Explicit state and ordered commands give me a place to trace why the world changed, and make it easier to reproduce a surprising outcome.

I used `src/sim/sim_tick.gd`, `src/sim/worldgen.gd`, `src/sim/sim_serialization.gd`, and `tests/test_worldgen_determinism.gd`. I inspected the source and history; I did not run the simulation, exports, or tests.
