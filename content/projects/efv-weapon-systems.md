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

I built the configuration flow around a weapon screen. Opening a weapon fills its attachment slots, connects the inventory grid, and shows stats and a preview. Picking a slot filters the available parts; equipping or removing one refreshes the numbers and rebuilds nested slots, since an attachment can expose more places to configure.

## Calculating attachment effects

I represented a configured weapon as more than a flat list of bonuses. The calculator combines a weapon template with the modifiers supplied by its attached parts. Different properties use different aggregation rules: recoil and accuracy use percentage adjustments, loudness uses additive changes, durability burn multiplies factors, and weight includes attachments and the magazine. The implementation approximates ammunition weight rather than deriving a detailed physical model.

Folding a weapon also changes the calculation. Stock modifiers can be excluded from recoil while folded, and ergonomics can receive a folded bonus. That is an example of configuration state affecting the meaning of an attachment, rather than every installed item always contributing the same value.

Calculated statistics are cached until invalidated. The calculator exposes an event after recalculation, giving presentation code a point at which to refresh. This keeps the distinction between stored configuration, derived values, and displayed comparisons explicit. I have not benchmarked this approach.

I kept the attachment preview intentionally simple. I use a subset of cached statistics to give quick feedback; a full recalculation would be more accurate. The preview is approximate; a full recalculation would be needed for exact parity with the configured weapon.

## Inventory interaction

I added undo and redo controls around an inventory-operation model. Their presence establishes the structure for reversible editing; I still need to test every attachment operation through undo and redo. Similarly, the screen handles returning an unequipped item to inventory and logs placement failure, but Full-inventory behavior still needs more testing.

## Where I left it

EFV is a weapon-systems prototype, not a finished combat game. My work here is the WeaponModSystem; the adjacent reference material and third-party assets are not my original work.
