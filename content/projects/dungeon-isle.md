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

I imagined the player as the steward of an island above an ancient dungeon. I started implementing that relationship through party selection, supplies, resident trust, injuries, gathering, crafting, and expedition outcomes.

## A party that has a life above ground

Before an expedition, the game state records the selected residents and packed supplies. During combat, it tracks the party's condition. Returning from a run feeds the outcome back into resident state rather than treating each encounter as an isolated match.

I modeled relationships with a trust value and memory flags. A flag can select a specific dialogue response, while other responses depend on injury, time of day, or maximum trust. The implementation even prioritizes a fresh memory so it can surface before the character returns to ordinary idle dialogue.

That lets me connect a resident's response to something that happened on an earlier expedition. I wanted their history to shape how they react, instead of reducing every relationship to a numerical bonus. Whether that makes players care more is something I have not tested.

## Rules separate from their presentation

The battle simulator accepts plain-data combatants and returns event dictionaries for the scene to animate. It determines initiative, tracks rounds, and exposes legal actions. This gives the combat rules a boundary independent of their visual presentation.

The design document points toward an action crawler, but I implemented turn-based combat in the prototype.

Dungeon branches have a similarly explicit generation layer. A generic wave-function-collapse solver works with cells, tiles, and compatible edge tags. It propagates constraints, chooses a low-entropy cell, and makes a weighted selection. Seeded retries handle failed arrangements with a bounded number of attempts. The solver can therefore produce room arrangements without owning the scene that renders them.

## Where I left it

I worked on Dungeon Isle from July 13–20, 2026, in Godot 4.6 and GDScript. I built gathering, crafting, relationships, injury, difficulty, and branch-generation systems, with unit and integration tests. I used KayKit assets for characters.

I have more settlement and co-op ideas for this game. The prototype currently connects persistent resident state to expeditions and turn-based combat.
