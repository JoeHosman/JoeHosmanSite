---
title: "RogueCraps"
summary: "A Unity dungeon prototype connecting ECS combat, physical dice, procedural geometry, and grid inventory."
date: "2026"
categories: [game-development, software]
status: prototype
featured: false
draft: false
cover: ""
cover_alt: ""
---

I explored a dungeon game built around dice and equipment in RogueCraps, part of [Missouri Video Game Company LLC](/projects/missouri-video-game-company/). Its retained Unity implementation combines entity-component-system combat with physical dice objects and a spatial inventory. The interesting engineering boundary is between a discrete combat decision and a roll that takes time to resolve.

## From combat action to dice result

I start combat actions as pending requests. An attack creates a critical-hit roll request; fleeing creates a different request with its own threshold. Combat enters a waiting phase until responses arrive, then translates those responses into effects. Defending takes a direct path and adds a component representing 50 percent damage reduction. I traced this flow in code; I have not played through a full dungeon run.

I represented a roll as a request and response rather than resolving every action immediately. For attacks, the request preserves base damage and the attack context. When the response returns, the system compares the result against luck and can apply a 1.5-times critical multiplier before creating a physical-damage event. That separates choosing an action, obtaining a result, and applying its consequence.

## Physical dice and generated geometry

The physical-dice implementation has its own lifecycle. It applies force and torque to a rigid body, tracks whether both linear and angular motion remain below a threshold, and waits for a settling interval. It then reads the upward-facing value by comparing face-marker directions with world up. This is retained simulation logic; the review did not establish the statistical fairness of its physical rolls or behavior in every collision arrangement.

I also included procedural dice construction. A factory creates mesh objects, materials, convex colliders, rigid bodies, and face markers from polyhedron data. It caches source meshes and creates per-die mesh instances. The face markers bridge visible geometry and the value-reading code, making the generated object usable by the same physical-dice component.

## Placing equipment in a grid

Inventory adds another concrete interaction. A placement request includes a target position and rotation, which can swap the item's occupied width and height. When moving an item, the system clears its old cells before checking the new position so that the item does not collide with itself. If placement fails, it restores the old cells and emits a failure event. Stacking and splitting have additional paths. This is a useful example of protecting game state around a reversible player action.

## Unfinished systems and evidence

The implementation boundary is significant. Combat item use and abilities are explicit TODOs in the action executor. Their action types exist, but that is not equivalent to functioning item effects or ability cooldowns. Steam co-op appears as design intent in the retained review and is not presented here as delivered multiplayer functionality.

RogueCraps is therefore a prototype case study about connected systems: asynchronous roll handling, physical presentation, generated dice geometry, and inventory placement. Its relationship to DungeonCraps is unconfirmed, so each has its own page and its own evidence. This review establishes neither a public release nor a finished dungeon campaign.

I inspected `Assets/Scripts/Systems/Combat/ActionExecutionSystem.cs`, `Assets/Scripts/Mono/Dice/PhysicsDice.cs`, `Assets/Scripts/Mono/Dice/ProceduralDiceFactory.cs`, and `Assets/Scripts/Systems/Inventory/ItemPlacementSystem.cs`, relative to the RogueCraps-Unity project. I inspected the code; I did not launch the game or rerun its tests.
