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

I made the core interaction continuous: watch the image, hold a button to boo a non-puppy, and let go when a puppy appears. Holding during the wrong image subtracts points. The score is clamped at zero, so an early mistake cannot create an accumulating negative balance. I still need to tune the timing with players.

I used time-based scoring rather than awarding one point per press. The configured defaults add ten points per second for booing a non-puppy and subtract ten per second for booing a puppy. Each update applies the rate using elapsed frame time. The result is that both noticing the image change and releasing promptly matter to the score.

I control the rhythm with a few simple rules: after each non-puppy, show one to five puppies before another non-puppy; choose images randomly within each group; and keep puppies on screen longer. The current windows are two to four seconds for non-puppies and three to eight for puppies, and I left them easy to tune.

## Input and feedback

The controller accepts keyboard input, selected gamepad buttons, and the left mouse button. Press and release transitions start and stop a loop of randomly selected boo sounds. Visual-effect calls follow the same transitions. That connects the player's held input to sustained feedback instead of treating sound as an unrelated effect on a single click.

I also included editor actions that load the puppy, non-puppy, and sound collections from asset folders. That keeps the content collections separate from the timing and scoring code. I added setup messages for missing images or audio so it is clear when an asset collection is empty.

## Where I left it

BooBoo is a small prototype built around one reaction loop, image sequencing, and feedback. I have a WebGL build. The images and sounds are supplied content, not assets I made.
