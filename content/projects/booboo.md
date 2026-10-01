---
title: "BooBoo"
summary: "A small Unity reaction game: hold to boo non-puppy images, then release when a puppy appears."
date: "2026"
categories: [game-development, software]
status: prototype
featured: false
draft: false
cover: ""
cover_alt: ""
---

I built BooBoo as a small reaction-game experiment under [Missouri Video Game Company LLC](/projects/missouri-video-game-company/). The rule is easy to explain: boo the non-puppy images and leave the puppies alone. Its implementation turns that joke into a continuous timing problem by scoring how long the player holds the input.

## Hold, watch, and release

I made the core interaction continuous: watch the image, hold a button to boo a non-puppy, and let go when a puppy appears. Holding during the wrong image subtracts points. The score is clamped at zero, so an early mistake cannot create an accumulating negative balance. I did not launch a build or test the reaction timing with players.

I used time-based scoring rather than awarding one point per press. The configured defaults add ten points per second for booing a non-puppy and subtract ten per second for booing a puppy. Each update applies the rate using elapsed frame time. The result is that both noticing the image change and releasing promptly matter to the score.

The image sequence also has rules. A non-puppy is followed by between one and five puppy images before another non-puppy can appear. Within each category, the controller chooses an image randomly. The default display windows differ: non-puppies appear for two to four seconds, while puppies appear for three to eight seconds. These are tunable source defaults, not a claim that this timing was validated with players.

## Input and feedback

The controller accepts keyboard input, selected gamepad buttons, and the left mouse button. Press and release transitions start and stop a loop of randomly selected boo sounds. Visual-effect calls follow the same transitions. That connects the player's held input to sustained feedback instead of treating sound as an unrelated effect on a single click.

I also included editor actions that load the puppy, non-puppy, and sound collections from asset folders. That keeps the content collections separate from the timing and scoring code. The implementation checks for empty image collections and missing audio, providing explicit diagnostics for incomplete setup.

## Prototype scope and evidence

BooBoo's scope is deliberately small in this portfolio: one reaction loop, its sequencing rules, and its feedback plumbing. Retained WebGL build artifacts were recorded in the project review, but they were not launched and do not establish a public release or current browser compatibility. I am not claiming authorship of the underlying photos or audio through this case study.

I based the mechanics on `BooBoo_Unity/Assets/Scripts/PuppyController.cs`, including its calls into `BooBoo_Unity/Assets/Scripts/BooVisualEffects.cs`. I inspected these files, but did not run the game or tests. The visual-effects file shows the feedback integration; I did not verify it in play.
