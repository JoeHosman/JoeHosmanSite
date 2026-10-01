---
title: "Forever Stick Fight: procedural figures and roguelike combat"
summary: "A Godot combat prototype combining procedural stick-figure motion, data-driven weapons, and a touch-friendly biome-crawl mode."
date: "2026"
categories: [game-development, software]
status: prototype
featured: false
draft: false
cover: ""
cover_alt: ""
---

Forever Stick Fight is one of my [Missouri Video Game Company](/projects/missouri-video-game-company/) prototypes. Its visual language is deliberately simple: dark stick figures, drawn lines, and combat effects. The project explores that language through arena and dojo scenes, then extends it into a biome-crawl mode with automatic attacks and run-specific upgrades.

The player moves through combat while a growing collection of weapons determines how nearby enemies are attacked. Card choices and weapon pickups change a run's behavior, while bosses and paths give the movement a larger structure. The implemented prototype includes climbing platforms as well as the broader runner ideas described in its design documents.

![Streets prototype with a stick fighter, projectiles, health bar, weapon slots, and touch controls.](/images/projects/forever-stick-fight/streets-prototype.png)

*A May 4, 2026 development screenshot showing the Streets scene, touch controls, and weapon slots.*

## Drawing motion from a few points

One of the most concrete systems is the procedural figure rig. A fighter's position acts as its pelvis, while a spring-like head offset responds to movement. When the fighter accelerates, the head can lag behind; when it stops, the offset settles. Fractions of that displacement carry into the spine and limbs so the whole figure reads as a connected body.

The spring rig draws the resulting lines each frame. It explicitly avoids a physics-bone or pin-joint setup, and it does not use an inverse-kinematics solver. That distinction matters because several earlier animation experiments live in a directory named `ik`. The project contains multiple approaches, and the spring rig has its own simpler motion model.

Combat poses sit on top of this structure. The move definitions include jabs, hooks, kicks, airborne attacks, flips, and weapon motions. They give the procedural body a vocabulary beyond locomotion while preserving the same minimal visual form.

## Building a run from reusable combat parts

Weapon and style resources separate many combat definitions from the scene that runs the game. The biome-crawl coordinator brings together the player controller, card pool, card-draft logic, biome director, path-selection interface, weapon pickups, and run-ending presentation.

I wired in touch input, loot boxes, destructible platforms, boss encounters, and a weapon-evolution recipe. That gave me more ways to explore how movement, automatic attacks, and player choices shape a run.

The broader design goes further, describing a longer biome chain and persistent progression. I treat that document as the direction of the experiment. It does not establish that every planned biome, unlock, or commercial-release goal was completed.

## Where I left it

I worked on this from April 14 through May 6, 2026, using Godot 4.6 and GDScript. The May 4 screenshot shows the game as it looked during development, with its sparse visual style and touch controls.

This is separate from [Stick Fighter Forever](/projects/stick-fighter-forever/), a smaller survival-platformer I built as a different project.
