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

My implementation generates platform rows, vertical clusters, and bridges across a large play area. Enemies enter the world, automatic attacks select targets, defeated enemies produce experience gems, and leveling opens an upgrade choice.

The available attacks cover different spaces around the player. A ranged attack targets a nearby enemy, a slash handles close encounters, and an orbiting weapon deals damage as it moves around the character. Chain-zap behavior adds another way to reach nearby targets. This makes positioning relevant to how the automatic weapons connect with enemies.

Upgrade definitions change those relationships. Choices can increase damage, shorten attack cooldowns, extend pickup range, improve health, widen a slash, or strengthen the orbiting weapon. I apply each selected upgrade to the player's properties, so the choice affects the running simulation rather than remaining a menu-only interaction.

## Keeping the experiment small

I kept the runtime to five scripts covering the main scene, player, enemies, projectiles, and experience gems. The main coordinator owns the world-generation and combat loop, while the player script handles movement, damage, experience, and upgrades. The visual approach uses simple vector-like figures and drawn effects.

I kept the prototype compact, with the wave, attacks, pickups, and level-ups coordinated in a small set of scripts. That made the loop quick to build, though the main coordinator now has several jobs a larger game would split up.

## Where I left it

I built this in Godot 4.3, with development work dated May 17, 2026. I started with a platformer, then expanded the procedural level.

This is a separate project from [Forever Stick Fight](/projects/forever-stick-fight/). The titles are similar, but these are two different games with separate code and development histories.
