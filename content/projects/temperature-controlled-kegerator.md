---
title: "A freezer, some woodwork, and a temperature controller"
summary: "Turning a used chest freezer into a kegerator with a wooden facade and a microcontroller-based temperature control."
date: "unknown"
categories: [woodworking, electronics, mechanical-engineering]
status: completed
featured: false
draft: false
cover: "/images/projects/temperature-controlled-kegerator/finished-wood-case.webp"
cover_alt: "Finished wooden kegerator cabinet with a brass tap tower beside the windows."
cover_caption: "The finished wooden case, top, and brass tap tower."
media:
  - type: image
    src: "/images/projects/temperature-controlled-kegerator/temperature-controller.webp"
    alt: "Rear of the kegerator showing the freezer, controller wiring, and a meter during circuit work."
    caption: "The temperature-control circuit and wiring behind the wooden facade."
    width: 902
    height: 1600
  - type: image
    src: "/images/projects/temperature-controlled-kegerator/wood-case-detail.webp"
    alt: "Closer view of the kegerator woodwork, polished top, drip tray, and brass tower."
    caption: "A closer view of the wood case and finished top."
    width: 1600
    height: 902
---

## Reusing a working freezer

My college roommate had a used chest freezer with a working compressor. We
turned it into a kegerator. I built a wheeled wooden base and a tongue-and-groove
facade, then added a finished top with a six-spout brass tower.

The resin-finished lid became heavy enough to need stronger opening springs and
a wooden stop to keep it from falling shut.

## Controlling the temperature

I built an Arduino-based controller with a temperature sensor and relay. It
switched the compressor on above an upper temperature threshold and off below a
lower one, leaving a range between the two so it wasn't constantly switching.

The project combined cabinetry, mechanical adjustments, and a small control
circuit. The controller was still in use at a friend's house when I recorded
these notes, roughly twenty years after the build.
