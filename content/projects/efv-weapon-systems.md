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

I explored modular weapon configuration in the EFV / WeaponModSystem Unity prototype, part of [Missouri Video Game Company LLC](/projects/missouri-video-game-company/). I focused on the WeaponModSystem: how attachment slots, configured weapon instances, calculated statistics, and inventory fit together.

## Configuring a weapon

I built the configuration flow around a weapon screen. Opening a weapon fills its attachment slots, connects the inventory grid, and shows stats and a preview. Picking a slot filters the available parts; equipping or removing one refreshes the numbers and rebuilds nested slots, since an attachment can expose more places to configure. I reviewed this path in the code rather than running a playtest.

## Calculating attachment effects

I represented a configured weapon as more than a flat list of bonuses. The calculator combines a weapon template with the modifiers supplied by its attached parts. Different properties use different aggregation rules: recoil and accuracy use percentage adjustments, loudness uses additive changes, durability burn multiplies factors, and weight includes attachments and the magazine. The implementation approximates ammunition weight rather than deriving a detailed physical model.

Folding a weapon also changes the calculation. Stock modifiers can be excluded from recoil while folded, and ergonomics can receive a folded bonus. That is an example of configuration state affecting the meaning of an attachment, rather than every installed item always contributing the same value.

Calculated statistics are cached until invalidated. The calculator exposes an event after recalculation, giving presentation code a point at which to refresh. This keeps the distinction between stored configuration, derived values, and displayed comparisons explicit. It is an implementation approach, not a benchmark claim about runtime performance.

I kept the attachment preview intentionally simple. It adjusts a subset of cached statistics to provide quick feedback and says that a complete recalculation would be more accurate. The preview is approximate; a full recalculation would be needed for exact parity with the configured weapon.

## Inventory interaction

I added undo and redo controls around an inventory-operation model. Their presence establishes the structure for reversible editing; this review did not exercise every attachment operation through that history. Similarly, the screen handles returning an unequipped item to inventory and logs placement failure, but source inspection does not establish every full-inventory interaction as finished.

## Prototype scope and evidence

EFV is therefore presented as a systems prototype, with a narrower claim than a released combat game. My portfolio account covers the WeaponModSystem code inspected for this review. Adjacent reference material is not presented as my implementation, and this page makes no claim to original third-party mechanics, assets, or a completed production title.

I inspected `Assets/Scripts/WeaponSystem/Stats/WeaponStatCalculator.cs` and `Assets/Scripts/UI/WeaponModding/WeaponModdingScreen.cs`, relative to the WeaponModSystem Unity project. I inspected the interface and calculation code; I did not launch the project or rerun its tests.
