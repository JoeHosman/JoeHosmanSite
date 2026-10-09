---
title: "Surf Track Weaver"
summary: "A browser experiment that builds surf tracks from ramp pieces and sends a bot through them as it goes."
date: "2026-10-09"
categories: [game-development, software]
status: prototype
featured: false
draft: false
cover: ""
cover_alt: ""
---

[Open Surf Track Weaver](/experiments/surf-track-weaver/index.html)

This [Missouri Video Game Company](/projects/missouri-video-game-company/) experiment builds a surf course one ramp at a time. Change the seed, adjust the turns and gaps, or step through the build to see why a piece was chosen.

The generator chooses from straights, curves, boosters, launches, and gaps. It favors turns back toward the existing track as the course spreads out, and checks clearance where ramps cross. When a choice leads to a dead end, it backs up and tries another.

The visible ramps and collision surfaces are separate. Switching to Playerclip shows the flat wedges underneath the smoother mesh. A bot runs through those wedges during generation; its failures can reject a piece before the next one is placed. The inspector shows the alternatives, their weights, and reasons for rejection.

It's a single HTML file using JavaScript and Three.js. The movement model borrows Source-style gravity, air acceleration, and collision rules, but a bot clearing a track isn't proof that it plays well in Source. There is no Hammer export or player-controlled run yet, and some settings leave the generator boxed in before it reaches the requested length.
