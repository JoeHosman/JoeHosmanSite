---
title: "Stick Fighter Forever: movement-first survival"
summary: "A compact platform-survival prototype with automatic weapons, generated platforms, enemy waves, and upgrade choices."
date: "2026"
categories: [game-development, software]
status: prototype
featured: false
draft: false
cover: ""
cover_alt: ""
---

I built Stick Fighter Forever as a small Godot prototype under [Missouri Video Game Company](/projects/missouri-video-game-company/). It combines platform movement with survival combat: the player jumps, dashes, and chooses where to stand while weapons attack automatically.

That division gives the prototype a clear focus. Movement remains an active decision even when the player does not press a separate button for every attack. Platforms create routes through the world, enemy waves make those routes dangerous, and experience pickups give the player a reason to move toward places that may no longer be safe.

## A compact survival loop

The retained implementation generates platform rows, vertical clusters, and bridges across a large play area. Enemies enter the world, automatic attacks select targets, defeated enemies produce experience gems, and leveling opens an upgrade choice.

The available attacks cover different spaces around the player. A ranged attack targets a nearby enemy, a slash handles close encounters, and an orbiting weapon deals damage as it moves around the character. Chain-zap behavior adds another way to reach nearby targets. This makes positioning relevant to how the automatic weapons connect with enemies.

Upgrade definitions change those relationships. Choices can increase damage, shorten attack cooldowns, extend pickup range, improve health, widen a slash, or strengthen the orbiting weapon. The code connects the selected upgrade back to the player's properties, so the choice affects the running simulation rather than remaining a menu-only interaction.

## Keeping the experiment small

The project contains five runtime scripts covering the main scene, player, enemies, projectiles, and experience gems. The main coordinator owns the world-generation and combat loop, while the player script handles movement, damage, experience, and upgrades. The visual approach uses simple vector-like figures and drawn effects.

This is a compact prototype architecture. It makes the relationship between a wave, an attack, a pickup, and a level-up easy to locate in the source. It also means the main script carries several responsibilities that a larger game might eventually separate.

## What this case study represents

The retained Git history is dated May 17, 2026, and the project configuration targets Godot 4.3. It records an initial platformer prototype followed by expansion of the procedural level scale. Those dates describe development evidence, not a release.

This is a separate project from [Forever Stick Fight](/projects/forever-stick-fight/). The similar titles and stick-figure survival themes do not establish that one is a renamed version of the other; the retained repositories have distinct implementations.

Source notes: this account draws on `docs/CONCEPT.md`, `scripts/main.gd`, `scripts/player.gd`, and `project.godot`. Source and development history were inspected; gameplay and tests were not rerun for this write-up.
