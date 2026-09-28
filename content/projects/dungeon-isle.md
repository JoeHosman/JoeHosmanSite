---
title: "Dungeon Isle: the residents come with you"
summary: "A settlement-and-expedition prototype connecting resident relationships, injuries, procedural dungeon branches, and party combat."
date: "2026"
categories: [game-development, software]
status: prototype
featured: false
draft: false
cover: ""
cover_alt: ""
---

Dungeon Isle is my settlement-and-expedition prototype under [Missouri Video Game Company](/projects/missouri-video-game-company/). Its central connection is that the people living on the island are also the people who accompany the player underground. An expedition changes the community that the player returns to.

The broader design casts the player as the steward of an island above an ancient dungeon. The retained prototype makes parts of that relationship concrete through party selection, supplies, resident trust, injuries, gathering, crafting, and expedition outcomes.

## A party that has a life above ground

Before an expedition, the game state records the selected residents and packed supplies. During combat, it tracks the party's condition. Returning from a run feeds the outcome back into resident state rather than treating each encounter as an isolated match.

The relationship system combines a trust value with memory flags. A flag can select a specific dialogue response, while other responses depend on injury, time of day, or maximum trust. The implementation even prioritizes a fresh memory so it can surface before the character returns to ordinary idle dialogue.

This provides a direct connection between an event and its later acknowledgment. It supports the design's question of whether remembered experiences can give residents more identity than a collection of numerical bonuses. The code implements that mechanism; player attachment remains a design hypothesis.

## Rules separate from their presentation

The battle simulator accepts plain-data combatants and returns event dictionaries for the scene to animate. It determines initiative, tracks rounds, and exposes legal actions. This gives the combat rules a boundary independent of their visual presentation.

The retained battle implementation is turn-based, even though the larger design document also describes an action-crawler direction. Describing the actual simulator is more useful than treating the initial genre description as a complete account of the prototype.

Dungeon branches have a similarly explicit generation layer. A generic wave-function-collapse solver works with cells, tiles, and compatible edge tags. It propagates constraints, chooses a low-entropy cell, and makes a weighted selection. Seeded retries handle failed arrangements with a bounded number of attempts. The solver can therefore produce room arrangements without owning the scene that renders them.

## The retained stage

Development history spans July 13–20, 2026, using Godot 4.6 and GDScript. The source includes gathering, crafting, relationships, injury, difficulty, and branch-generation systems, together with unit and integration test sources. KayKit assets are present in the project; their inclusion is not a claim of original character artwork.

The wider settlement vision and possible cooperative play remain broader than the evidence described here. This case study focuses on connecting a small community's persistent state to repeatable expeditions and explicitly modeled combat.

Source notes: the main references are `src/sim/relationship.gd`, `src/sim/battle_sim.gd`, `src/sim/wfc.gd`, and `src/autoload/game_state.gd`. Source and retained history were inspected; gameplay and tests were not rerun for this write-up.
