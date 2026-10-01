---
title: "DungeonCrossing: a quiet island and destructible dungeons"
summary: "A voxel-game prototype linking island activities and persistent player state with seeded dungeons, combat, and terrain destruction."
date: "2026"
categories: [game-development, software]
status: prototype
featured: false
draft: false
cover: ""
cover_alt: ""
---

DungeonCrossing is my [Missouri Video Game Company](/projects/missouri-video-game-company/) prototype combining a cozy island hub with destructible combat dungeons. The island provides quieter activities and persistent progress. Portals connect it to procedural spaces where weapons, enemies, and the terrain itself become part of combat.

The idea creates two different rhythms in one world: preparation and community on the surface, followed by a dangerous excursion and a return with changed inventory and health. My implementation also includes fishing, a short quest chain, buying and placing objects, and a tank that can interact with destructible terrain.

## Generating a place the player can break

The dungeon generator assembles room templates using connectors. Starting from a seeded random generator, it selects open connections, finds compatible rooms, and checks whether their bounds overlap existing placements. Attempts are bounded so an awkward combination of rooms does not lead to an endless search.

I separated layout planning from stamping the plan into the voxel volume. That makes the arrangement available as data before it becomes terrain, and gives the determinism tests a focused object to examine.

Destruction has its own entry point. Sphere-shaped hits and box-shaped cuts remove voxels while respecting protected material types. The floor remains intact, preventing an explosion near the player's feet from erasing the ground underneath them. Box carving supports the tank's ability to push through walls. Debris has a global cap and a limited lifetime, so visible fragments do not accumulate indefinitely.

## Carrying progress across the portal

Moving between the island and a dungeon also crosses a scene boundary. I snapshot player inventory and health at the scene transition, then restore them in the destination scene. Vehicle state follows a similar path, including whether the player was mounted.

Fishing knowledge, quest progress, and placed-item records live in shared game state. Placed objects can be recreated when the island loads again. These details connect the apparently separate activities: a purchase should still exist after an expedition, and a kill counted underground should still matter when the player returns to the quest giver.

## Where I left it

I built this in Godot 4.6 with GDScript, Jolt physics, and the godot_voxel extension over April 27–28, 2026. I added tests for procedural determinism and the scene-transition, destruction, fishing, quest, and buy/build systems.

I had bigger world and vehicle ideas for this, but focused on procedural generation, destruction, and carrying player state between scenes.
