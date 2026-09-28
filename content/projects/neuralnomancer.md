---
title: "Neuralnomancer: crafting with neural networks"
summary: "An extraction-game prototype where trainable neural networks define item behavior, supported by an in-engine learning runtime and a Rust marketplace."
date: "2026"
categories: [game-development, software, machine-learning]
status: prototype
featured: false
draft: false
cover: ""
cover_alt: ""
---

I built Neuralnomancer as part of [Missouri Video Game Company](/projects/missouri-video-game-company/). Its central idea makes machine learning part of the game itself: equipment can be trained, combined, damaged, and traded as a model with its own learned behavior.

The surrounding game is a dungeon-extraction prototype. The intended loop takes a player from a base into dangerous runs, back with materials and training data, and into another round of crafting and preparation. That gives training a practical context. A model is something the player can use and improve, with consequences outside a training screen.

## An item with something to learn

The material-system design describes tools whose inputs represent working conditions and whose outputs describe the resulting material. A smelter, for example, connects process inputs to material properties. Combat items have a similar mapping between an encounter's conditions and the item's response. Training fragments provide examples rather than simply adding a fixed stat bonus.

The implementation includes a neural-network runtime written in GDScript. It supports configurable layer dimensions, forward inference, a training pass with dropout, backpropagation, and mini-batch training. Separate optimizer code implements SGD and Adam. Those pieces run within the Godot client, so the learning mechanics do not require a Python process beside the game.

The runtime also connects the mathematics to the game design. Damage can modify network weights. Models can be duplicated, fused, or chained, and a binary format preserves their learned parameters. This makes an item's internal state more substantial than a name and a rarity label: two models can share an architecture while carrying different weights.

## From an individual model to a game economy

The prototype includes a Rust server using Axum and Tokio, with PostgreSQL storage and WebSocket session code. The marketplace handles listing, searching, buying, and cancellation. Its purchase path starts a database transaction and locks the active listing before completing the purchase.

That transaction boundary matters for a system trading serialized items. The listing, payment, and transferred item need to describe the same purchase, even when requests overlap. It is a concrete engineering problem alongside the more experimental crafting mechanics.

The server's validation boundary remains unfinished. Dungeon-run and model-integrity validation functions are placeholders that approve their inputs. The code therefore supports a story about a multiplayer and marketplace prototype, with implemented transaction handling, rather than a completed authoritative game service. Redis also appears in the infrastructure design without establishing a fully integrated runtime cache.

## What the retained project shows

Recorded development spans February 17 through March 17, 2026. The repository contains dungeon, combat, crafting, progression, and UI code alongside test sources for network mathematics and game systems. Windows executable and archive artifacts are retained, though their presence alone does not establish a public release or a verified playable build.

The distinctive part of this project is the connection between a small learning system and ordinary game objects. I implemented enough of the model lifecycle to make training, persistence, combination, and deterioration concrete mechanics to investigate within a larger extraction game.

Source notes: this case study draws on `client/scripts/nn/gd_neural_net.gd`, `client/scripts/nn/gd_optimizer.gd`, `game-server/src/marketplace.rs`, and `game-server/src/validation.rs`. Source and retained artifacts were inspected for this write-up; the game and tests were not rerun.
