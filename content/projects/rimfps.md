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

The implemented connection journey starts when an FPS client receives a session and player identity. The server begins asset transfer, then waits for readiness before sending ownership information and the cached initial world state. The connection flow is implemented, but multiplayer playtesting remains ahead. It shows how a player would enter an already-running simulation without requiring every object to be discovered through future updates.

I send definition registries before the map data that refers to them, then transfer terrain, structures, plants, items, pawn and animal appearances, and environmental state. That ordering matters: an ID is only useful once the client knows what it names.

## Ownership and synchronization

I also separated player identity from pawn ownership. The session manager tracks both the pawn owned by a client and the client owning a pawn. On disconnect, it releases that ownership, notifies RimWorld, and broadcasts the departure. That handles ownership cleanup when someone disconnects. Network faults during control or combat still need attention.

The RimWorld mod handles incoming commands and schedules updates by type: simulation state, colonist lists, environment, structures, and inventory for an open container. I set different intervals so the clients get the changes they need without treating every kind of state as equally urgent. Throughput and latency still need measurement.

## Rendering boundary

For terrain, I track dirty 16-by-16 chunks so the renderer knows what needs an update. Mesh generation itself is still a separate, unfinished piece.

I worked on RimFPS from November 2025 into February 2026. The project explores connecting multiple clients to an existing simulation through readiness checks, initial state transfer, ownership, and ongoing updates. A complete FPS game and reliable multiplayer service are still future work.
