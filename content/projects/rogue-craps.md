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

I built RogueCraps around a useful tension: combat actions are discrete, but a physical dice roll takes time to settle. The Unity prototype connects ECS combat to physical dice and a spatial inventory, so a roll can resolve an attack rather than just decorate it.

## From combat action to dice result

I start combat actions as pending requests. An attack creates a critical-hit roll request; fleeing creates a different request with its own threshold. Combat enters a waiting phase until responses arrive, then translates those responses into effects. Defending takes a direct path and adds a component representing 50 percent damage reduction. I traced this flow in code; I have not played through a full dungeon run.

I represented a roll as a request and response rather than resolving every action immediately. For attacks, the request preserves base damage and the attack context. When the response returns, the system compares the result against luck and can apply a 1.5-times critical multiplier before creating a physical-damage event. That separates choosing an action, obtaining a result, and applying its consequence.

## Physical dice and generated geometry

I roll physical dice by applying force and torque, waiting until the body settles, then finding which face points upward. I still need to check the roll distribution and unusual collision cases.

I generate dice from polyhedron data, including their meshes, materials, colliders, rigid bodies, and face markers. The same markers connect the visible die to the roll-reading logic, so generated dice use the same physics path as authored ones.

## Placing equipment in a grid

Inventory adds another concrete interaction. A placement request includes a target position and rotation, which can swap the item's occupied width and height. When moving an item, the system clears its old cells before checking the new position so that the item does not collide with itself. If placement fails, it restores the old cells and emits a failure event. Stacking and splitting have additional paths. This is a useful example of protecting game state around a reversible player action.

## Unfinished systems

Combat item use and abilities are not implemented yet; the action types are there, but not their effects or cooldowns. Steam co-op is an idea for the project, not a delivered feature.

RogueCraps is a prototype connecting asynchronous roll handling, physical dice, generated geometry, and inventory placement. It is separate from DungeonCraps; the two projects have different implementations. The dungeon campaign is unfinished.
