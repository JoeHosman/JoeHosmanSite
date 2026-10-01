---
title: "RimFPS"
summary: "A Unity multiplayer client, C# server, and RimWorld mod exploring a first-person view of an existing simulation."
date: "2026"
categories: [game-development, software]
status: prototype
featured: false
draft: false
cover: ""
cover_alt: ""
---

I explored a first-person multiplayer view into a RimWorld simulation through [Missouri Video Game Company LLC](/projects/missouri-video-game-company/). RimFPS connects a Unity client, a C# server, and a RimWorld mod. The engineering problem I focused on is keeping a second presentation of the world aligned with the simulation that owns it.

That involves more than forwarding positions. A joining client needs the right assets, definitions, terrain, objects, character appearances, and ownership information before those updates make sense. I built session and synchronization code around that dependency: joining the server and being ready to receive the world are separate stages.

## Joining an existing world

The implemented connection journey starts when an FPS client receives a session and player identity. The server begins asset transfer, then waits for readiness before sending ownership information and the cached initial world state. I inspected this connection path in code; I have not run a multiplayer playtest. It shows how a player would enter an already-running simulation without requiring every object to be discovered through future updates.

The initial-state path includes definition registries, map metadata, terrain chunks, structures, plants, items, pawn and animal appearances, and environmental state. Sending definitions before their consumers is a small but consequential ordering decision. A compact identifier is only useful after the receiving client knows what it identifies.

## Ownership and synchronization

I also separated player identity from pawn ownership. The session manager tracks both the pawn owned by a client and the client owning a pawn. On disconnect, it releases that ownership, notifies RimWorld, and broadcasts the departure. These paths address the lifecycle around control, including what happens when a participant leaves. They do not establish the behavior of every control or combat interaction under network faults.

On the mod side, a map component processes incoming commands and schedules outgoing updates. Its retained implementation distinguishes frequent simulation updates from colonist-list checks, environmental changes, structure changes, and inventory updates for pawns whose container interface is open. That distinction makes the synchronization work sensitive to what is changing and what a player is inspecting. The configured intervals are implementation choices, not measured throughput or latency results.

## Rendering boundaries and evidence

One useful boundary to call out is terrain rendering. My ECS terrain system groups cells into 16-by-16 chunks and records which chunks are dirty. It explicitly leaves mesh production to managed rendering code. I would not use that file alone as evidence of completed terrain rendering, even though its class name suggests a larger responsibility.

I worked on RimFPS from November 2025 into February 2026. It is an integration prototype: I focused on joining an existing simulation to multiple clients through readiness checks, initial state transfer, ownership, and ongoing updates. I have not established a complete FPS game, public release, or reliable multiplayer operation.

I inspected `RimFPS-Multiplayer-Server/RimFPS.Server/Session/SessionManager.cs`, `RimfFPS-Rimworld-Mod/Source/Core/GameStateWatcher.cs`, and `RimFPS-Unity-Client/Assets/Scripts/ECS/Systems/Rendering/TerrainMeshSystem.cs`, relative to the RimFPS project. I inspected the mod, server, and client code; I did not launch them or rerun their tests.
