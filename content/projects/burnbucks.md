---
title: "BurnBucks"
summary: "A small browser clicker that turns burning money into an escalating loop of manual income, automatic burners, and upgrades."
date: "2026"
categories: [game-development, software]
status: prototype
featured: false
draft: false
cover: ""
cover_alt: ""
---

I built BurnBucks as a small JavaScript browser game with a direct premise: click the burn pile, earn money, and spend it on ways to burn more. It is one of the smaller experiments in my [Missouri Video Game Company LLC](/projects/missouri-video-game-company/) work, with its state, progression, and presentation contained in a few files.

![BurnBucks showing the burn pile, falling bills, upgrade buttons, and one dollar per second from an owned auto-burner.](/images/projects/burnbucks/playing.png)

*The local prototype after purchasing the first auto-burner. The HUD shows one dollar per second, and the upgrade panel shows one owned.*

## A short path from clicking to automation

The opening click earns a dollar. Click-power upgrades increase that amount, while auto-burners add recurring income. The progression moves through increasingly exaggerated equipment and characters, from an intern with a lighter to an industrial incinerator and an AI-themed final tier. Those names are game content; they do not represent services or integrations.

Repeat purchases become more expensive. Each auto-burner's next price uses its base cost and a multiplier raised to the number already owned. The interface shows ownership, price, and affordability so the next purchase is visible alongside its effect on income.

## Keeping the implementation small

I separated upgrade definitions from game behavior. The data file supplies prices, click values, income rates, and progression constants. The main script handles balance changes, purchases, rendering, and saves using ordinary browser APIs.

The visual feedback includes floating earnings, falling bills, and a brief pulse on the burn pile. Upgrade rendering tracks the values that affect its display, including ownership and affordability. Local storage preserves the balance, click tier, and auto-burner counts, with periodic saves and saves when the page is hidden or closed.

## Where I left it

The September 2026 browser review checked twelve clicks and a first auto-burner purchase. The interface showed one dollar per second afterward, without observed page errors. That is the specific progression captured here; later upgrades and long-running balance were not evaluated in that check.

BurnBucks is still a prototype, but the small scope let me keep input, rewards, purchases, and automated income close together and easy to follow. I used `BurnBucks/game.js` and `BurnBucks/upgrades.js`.
