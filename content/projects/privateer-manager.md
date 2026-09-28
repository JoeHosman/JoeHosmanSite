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

Privateer Manager is my maritime-management prototype under [Missouri Video Game Company](/projects/missouri-video-game-company/). The player operates a privateer company in a world where ships travel, cities consume and produce goods, contracts appear, and competing forces act on their own.

The player-facing idea is a company inside a moving economy. Sending a ship somewhere is connected to what happens when it arrives: a contract may complete, cargo and money change hands, a subscribed route may continue, or an encounter may interrupt the voyage. Fleet management becomes a sequence of decisions inside a larger simulation.

## One decision inside a moving world

The retained implementation covers player commands, fleets, contracts, trade-route subscriptions, reputation, and combat resolution. It also gives the surrounding world its own behavior. Pirate and trader AI choose actions, warships have their own movement and return paths, and city systems track economic activity and population.

This creates dependencies between systems. A ship arriving at a city can affect more than its own location. Contract completion influences money and reputation; arrivals contribute to city wealth; damage affects repair time and later encounters. The project includes additional systems for diplomacy, blockades, city emergence, and country balance.

The interesting engineering question is how to keep those interactions understandable. If every visual object changes the world independently, tracing a surprising result becomes difficult. Privateer Manager concentrates the running simulation's state changes in an explicit tick.

## A simulation with a repeatable input

The core contract is that the same state and commands produce the same next state. The tick avoids clocks, global randomness, and nondeterministic thread behavior. World generation supplies an initial state, commands express player decisions, and the simulation advances from there.

The tick applies commands, runs autonomous behavior, moves ships, processes encounters and arrivals, updates the economy, and advances periodic systems. Rendering reads the resulting state. Serialization handles saving and restoring it. That organization gives the simulation a boundary that can be examined without depending on how the strategic map is drawn.

A small implementation detail illustrates the value of that boundary. Ship removals are deferred until after the movement loop. Removing a ship while iterating the same array can shift the next ship into an already-visited index and skip its update. Collecting removals first keeps a combat or arrival result from accidentally changing which ships receive a turn.

## What is implemented, and what is recorded

The project uses Godot and GDScript, with configuration targeting Godot 4.3. Retained development history runs from April 25 through April 27, 2026. The source includes procedural land and world generation, persistence, a strategic-map interface, and a substantial collection of subsystem tests, including a world-generation determinism test.

Web and Linux export presets are present. The repository also contains a browser-based design-document viewer and a log dashboard; those are supporting tools, not evidence of a published browser game. This remains a prototype case study rather than a release announcement.

For my portfolio, Privateer Manager captures a specific kind of work: translating an interconnected game world into explicit state, commands, and ordered transitions. The same structure makes autonomous behavior possible while keeping its consequences available for inspection.

Source notes: key evidence includes `src/sim/sim_tick.gd`, `src/sim/worldgen.gd`, `src/sim/sim_serialization.gd`, and `tests/test_worldgen_determinism.gd`. The source and retained history were inspected; simulation runs, exports, and tests were not rerun for this write-up.
