---
title: "EFV / WeaponModSystem"
summary: "A Unity systems prototype for modular weapon configuration, attachment statistics, and inventory interaction."
date: "2026"
categories: [game-development, software]
status: prototype
featured: false
draft: false
cover: ""
cover_alt: ""
---

I explored modular weapon configuration in the EFV / WeaponModSystem Unity prototype, part of [Missouri Video Game Company LLC](/projects/missouri-video-game-company/). This case study focuses on the retained WeaponModSystem implementation: how attachment slots, weapon instances, calculated statistics, and an inventory interface fit together.

## Configuring a weapon

The player-facing interaction is a configuration screen. In the inspected code path, opening a weapon populates its slots, attaches an inventory grid, initializes the statistics panel, and displays a weapon preview. Selecting a slot filters the modification list. Equipping or removing an attachment refreshes the display and rebuilds nested slots, because one attachment can introduce places for additional attachments. This is a walkthrough of the interface implementation, not an observed playtest.

## Calculating attachment effects

I represented a configured weapon as more than a flat list of bonuses. The calculator combines a weapon template with the modifiers supplied by its attached parts. Different properties use different aggregation rules: recoil and accuracy use percentage adjustments, loudness uses additive changes, durability burn multiplies factors, and weight includes attachments and the magazine. The implementation approximates ammunition weight rather than deriving a detailed physical model.

Folding a weapon also changes the calculation. Stock modifiers can be excluded from recoil while folded, and ergonomics can receive a folded bonus. That is an example of configuration state affecting the meaning of an attachment, rather than every installed item always contributing the same value.

Calculated statistics are cached until invalidated. The calculator exposes an event after recalculation, giving presentation code a point at which to refresh. This keeps the distinction between stored configuration, derived values, and displayed comparisons explicit. It is an implementation approach, not a benchmark claim about runtime performance.

The source also contains an intentionally simplified attachment preview. It adjusts a subset of cached statistics to provide quick feedback and says that a complete recalculation would be more accurate. I preserve that limitation here: an approximate comparison is useful prototype behavior, but it should not be described as exact parity with the final configured weapon.

## Inventory interaction

The interface includes undo and redo controls and an inventory operation model. Their presence establishes the structure for reversible editing; this review did not exercise every attachment operation through that history. Similarly, the screen handles returning an unequipped item to inventory and logs placement failure, but source inspection does not establish every full-inventory interaction as finished.

## Prototype scope and evidence

EFV is therefore presented as a systems prototype, with a narrower claim than a released combat game. My portfolio account covers the WeaponModSystem code inspected for this review. Adjacent reference material is not presented as my implementation, and this page makes no claim to original third-party mechanics, assets, or a completed production title.

Source notes: I inspected `Assets/Scripts/WeaponSystem/Stats/WeaponStatCalculator.cs` and `Assets/Scripts/UI/WeaponModding/WeaponModdingScreen.cs`, relative to the WeaponModSystem Unity project. The interface, calculations, and tests were not launched or rerun for this case study. The verified artifact is the retained implementation and its explicit limitations.
