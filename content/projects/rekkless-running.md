---
title: "RekklessRunning"
summary: "A Unity runner that grows a chain of procedural rooms, with spline geometry and editor tools supporting the loop."
date: "2026"
categories: [game-development, software]
status: prototype
featured: false
draft: false
cover: ""
cover_alt: ""
---

I built RekklessRunning as a procedural runner experiment under [Missouri Video Game Company LLC](/projects/missouri-video-game-company/). Its Unity project combines the game loop with the tools needed to construct the course: connected rooms, room templates, spline paths, and an editor for inspecting the chain. The SplineTooling project is part of this game's implementation.

## A course that grows after each run

The loop has a concrete change at its endpoint. When the runner reaches the finish, the loop manager creates another room, rebuilds the connected chain, increments the completed-loop count, and returns the runner to the start. The next traversal includes the expanded course. Room creation receives the loop count so templates can use progression when generating content.

Following the implementation, a player travels along the connected route, reaches the finish-room exit, and starts again after the new geometry is positioned. The restart waits until the end of a frame before telling the spline follower to begin. That sequence is visible in source; I did not launch the game or assess the pacing and feel of successive runs for this portfolio review.

## Connecting procedural rooms

![Top-down prototype view of a narrow red corridor joining a wider purple room.](/images/projects/rekkless-running/room-connection-prototype.png)

*Retained development capture showing the connection between a narrow, varying-width corridor and a wider room. This geometry view documents the prototype, rather than a newly recorded gameplay session.*

I treated room connections as an explicit geometry problem. Each room has neighbors, and creating a room can change those relationships. The stack inserts a new room near the start, reapplies the neighboring template, regenerates the start-room visuals, and rebuilds the chain. The reason for rebuilding is practical: template application can alter socket offsets, so a visually plausible room is not enough unless its entry and exit still meet the adjoining rooms.

Templates are selected by creation index using interval and priority rules, with a default template as a fallback. A configured seed also produces per-room random generators. This provides a way to revisit template choices and room variation during development. I do not describe the entire course as fully deterministic: the inspected centerline generator also uses Unity's random API for optional lateral variation.

The spline generator accounts for the room's shape instead of assuming that every space is a straight rectangle. It samples a centerline, reserves a minimum clear path width, and limits lateral offsets to the remaining space with a safety margin. Entry and exit points align with room sockets, and the shaped-room path incorporates floor height for slopes. A rectangular fallback handles rooms without a shape definition.

Those details connect procedural variety to movement constraints. Wider space permits more lateral variation; narrow space keeps the path centered. Socket alignment lets one room hand the runner to the next. These are source-level constraints, not proof that every possible generated course is traversable.

## Tools for inspecting the course

I also built a Unity editor window for managing room stacks. It exposes start and finish rooms, creation controls, room lists, and scene focus. Putting those operations in an editor interface makes the generated structure inspectable while authoring it. This is a substantial part of the project story because the runtime loop and the authoring tools operate on the same room model.

## Development status and evidence

My retained development history spans December 2025 to January 2026. RekklessRunning remains a prototype in this portfolio: the source establishes course generation, connection management, and a growing run loop, while release status and sustained playtesting remain unverified.

I inspected `Assets/Scripts/Runtime/RoomStack.cs`, `Assets/Scripts/Runtime/EndlessRunLoopManager.cs`, `Assets/Scripts/Runtime/Splines/ShapeAwareCenterlineGenerator.cs`, and `Assets/Scripts/Editor/RoomStackEditorWindow.cs`, relative to the SplineTooling Unity project. I have not run the Unity project or its tests.
