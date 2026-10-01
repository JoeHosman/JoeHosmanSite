---
title: "DungeonCraps"
summary: "A Unity dice progression prototype combining zone capture, explicit probability, and escalating re-challenges."
date: "2026"
categories: [game-development, software]
status: prototype
featured: false
draft: false
cover: ""
cover_alt: ""
---

I built DungeonCraps around a dice question: how do you make the player weigh a dangerous roll against steady progress toward owning a zone? Each zone marks dangerous sums; successful rolls fill its capture meter. Dice pools, modifiers, protection, rewards, and re-challenges all grow out of that central risk loop.

## Rolling toward zone capture

I modeled the round as explicit states: choose a zone, roll, resolve the result, and either keep going or collect the zone and its gold. That keeps the transitions readable as modifiers and protection effects are layered in. I inspected those paths in code; I did not run a full gameplay session for this write-up.

I made the progression phases explicit so that a player cannot change the dice pool while a roll or its result is being presented. Leaving an uncaptured zone follows a separate path that resets its progress. These boundaries make each interaction's consequences legible in the orchestrating code, even as other systems add modifiers to the roll.

## Probability and protection

The probability helper models the exact distribution of two ordinary six-sided dice using the 36 possible outcomes. It exposes probabilities for individual sums and groups of sums, expected rolls before a failure, and survival across repeated rolls. Seven has six combinations, whereas two and twelve each have one. That difference gives danger-number selection a concrete mathematical meaning. The helper's two-dice model should not be read as validation of every configurable dice pool in the broader prototype.

A failed roll can be converted to success when an available protection is consumed. The orchestrator checks ability protection, then inventory protection, then betting insurance. It also combines configured progress multipliers and processes captured-zone decay. These paths show how secondary systems enter the loop; they do not establish that every corresponding interface is complete. The retained review found some ability and betting UI creation commented out.

## Returning to a captured zone

Re-challenging a captured zone adds a second progression decision. The game locks the following zone while the re-challenge is underway and uses increased capture requirements. Capture rewards also scale with repeated captures. That creates a distinction between advancing and revisiting an existing zone without requiring a separate rules engine for each.

## Prototype scope and evidence

I left DungeonCraps as a Unity prototype centered on probability and zone progression. Its relationship to the separately retained RogueCraps project is not established here. There is no claim of a release, completed balance pass, or verified end-to-end ability and betting experience.

I inspected `Assets/Scripts/Core/GameManager.cs`, `Assets/Scripts/Core/ZoneManager.cs`, and `Assets/Scripts/Utilities/DiceProbability.cs`, relative to DungeonCraps. I inspected the Unity code but did not launch the game or rerun the tests. Ability and betting UI remain incomplete, as noted above.
