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

I explored dice-driven zone progression in DungeonCraps, part of [Missouri Video Game Company LLC](/projects/missouri-video-game-company/). A zone defines which sums are dangerous, while successful rolls build progress toward capture. The prototype combines that simple risk model with dice pools, modifiers, failure prevention, rewards, and re-challenges.

## Rolling toward zone capture

The source-defined journey begins by selecting a zone and entering the ready-to-roll phase. Rolling evaluates the result against the zone's danger numbers, displays the outcome, and records success or failure. If progress reaches the capture requirement, the game awards capture gold and returns to zone selection. Otherwise, it returns to the roll-ready state. This is an inspection of implemented state transitions, not a completed gameplay session.

I made the progression phases explicit so that a player cannot change the dice pool while a roll or its result is being presented. Leaving an uncaptured zone follows a separate path that resets its progress. These boundaries make each interaction's consequences legible in the orchestrating code, even as other systems add modifiers to the roll.

## Probability and protection

The probability helper models the exact distribution of two ordinary six-sided dice using the 36 possible outcomes. It exposes probabilities for individual sums and groups of sums, expected rolls before a failure, and survival across repeated rolls. Seven has six combinations, whereas two and twelve each have one. That difference gives danger-number selection a concrete mathematical meaning. The helper's two-dice model should not be read as validation of every configurable dice pool in the broader prototype.

A failed roll can be converted to success when an available protection is consumed. The orchestrator checks ability protection, then inventory protection, then betting insurance. It also combines configured progress multipliers and processes captured-zone decay. These paths show how secondary systems enter the loop; they do not establish that every corresponding interface is complete. The retained review found some ability and betting UI creation commented out.

## Returning to a captured zone

Re-challenging a captured zone adds a second progression decision. The game locks the following zone while the re-challenge is underway and uses increased capture requirements. Capture rewards also scale with repeated captures. That creates a distinction between advancing and revisiting an existing zone without requiring a separate rules engine for each.

## Prototype scope and evidence

I present DungeonCraps as a Unity prototype with inspectable probability and progression rules. Its relationship to the separately retained RogueCraps project is not established here. There is no claim of a release, completed balance pass, or verified end-to-end ability and betting experience.

Source notes: I inspected `Assets/Scripts/Core/GameManager.cs`, `Assets/Scripts/Core/ZoneManager.cs`, and `Assets/Scripts/Utilities/DiceProbability.cs`, relative to DungeonCraps. The Unity game and its tests were not launched or rerun for this case study. The evidence supports the implemented rules and state flow, with the interface limitations stated above.
