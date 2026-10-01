---
title: "Journal RPG and Ironhaven"
summary: "A narrative RPG prototype connecting character journals, consequential choices, a changing timeline, and Git-backed world persistence."
date: "2026"
categories: [game-development, software]
status: prototype
featured: false
draft: false
cover: ""
cover_alt: ""
---

I built Journal RPG around characters living through a changing world and recording their experiences. A session produces more than a passage of text: choices can alter personal traits, relationships, faction standing, and story progress. The resulting journal belongs to a world with other people, places, and events.

I built the engine in Svelte and TypeScript. Ironhaven supplies a world and content template for the same engine, including locations and authored story material. I present them together as one project within [Missouri Video Game Company LLC](/projects/missouri-video-game-company/).

## Choices with persistent consequences

A character's circumstances help determine which choices are available. The resolver checks traits, skills, faction conditions, and the exhaustion cost of another action. Once the player chooses, explicit consequence types update the world. A relationship can gain an emotional value or tag; a faction's mood can change; a questline can advance through its counters.

Keeping those consequences in structured data gives the narrative a state that can be inspected and saved. The code can refer to a character bound to a story role and apply the consequence to that person. This supports reusable story material while preserving the identity of the people involved in a particular session.

Time is another part of the model. Characters and locations have dates that determine whether they exist at a selected point in the timeline. The application includes helpers for moving into a character's past or future and constructing a view of the world at that date. When I look back to an earlier date, some quest progress resets. Historical views are not yet a full replay of every past state.

## Saving a world through Git

I implemented a persistence layer that serializes world state into YAML files. Characters receive individual files, while the timeline, factions, locations, and story progress have their own records. That gives a saved world a structure beyond a single opaque save blob.

The GitHub writer contains a character-branch workflow: synchronize with the main branch, commit the new files, ensure a pull request exists, and attempt a merge. A failed merge gets a retry after another synchronization. If the merge still fails, the code can report that the changes remain on the branch and pull request.

This is an unusual engineering part of the game. Narrative progress and repository operations have different failure modes, so the implementation must distinguish a successful commit from a successful merge. I still need to test the GitHub workflow against an account.

## Optional prose generation

I also added an optional language-model adapter for rewriting narrative passages. It supplies character and location context, recent prose, and the latest choice, then asks for a short rewrite preserving the events and meaning. It supports a local compatible endpoint and a hosted provider, and falls back to the original passage if enhancement is disabled or fails.

The engine applies consequences; the language model only rewrites the prose. Its prompt asks it to preserve meaning, but generated text can still stray from that instruction.

## Where I left it

I worked on this through April 2026. The prototype has choice, timeline, prose, and persistence systems. Item-based choice preconditions and the full narrative campaign remain unfinished.
