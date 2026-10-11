---
title: "Early neural networks, character recognition, and a lot of noisy images"
summary: "Custom C# image processing, a character-segmentation test app, neural-network sketches, and experiments with spoken numbers."
date: "unknown"
categories: [machine-learning, software]
status: prototype
featured: false
draft: false
media:
  - type: image
    src: "/images/projects/early-neural-networks/historical-sample-1.webp"
    alt: "A small historical text image with thin lines crossing the characters."
    caption: "An original pre-reCAPTCHA sample, before processing."
    width: 290
    height: 80
  - type: image
    src: "/images/projects/early-neural-networks/historical-sample-2.webp"
    alt: "A historical text sample with dense grid-like interference behind and across the letters."
    caption: "Another original sample showing the background interference."
    width: 290
    height: 80
  - type: image
    src: "/images/projects/early-neural-networks/historical-sample-3.webp"
    alt: "A historical text sample with closely spaced characters and crossing background lines."
    caption: "A third original sample from the same collection."
    width: 290
    height: 80
  - type: image
    src: "/images/projects/early-neural-networks/historical-sample-4.webp"
    alt: "A historical text sample with slanted letters and line noise."
    caption: "A fourth original sample, still carrying its background noise."
    width: 290
    height: 80
  - type: image
    src: "/images/projects/early-neural-networks/character-sweeping-1.webp"
    alt: "The Broom character-sweeping test application displaying a character sample and diagnostic marks."
    caption: "The Broom, my custom character-segmentation test app."
    width: 425
    height: 368
  - type: image
    src: "/images/projects/early-neural-networks/character-sweeping-2.webp"
    alt: "A second view of The Broom with a different character sample and diagnostic marks."
    caption: "Another test case in the character-sweeping tool."
    width: 425
    height: 368
  - type: image
    src: "/images/projects/early-neural-networks/character-sweeping-3.webp"
    alt: "A third view of The Broom showing character shapes and the tool's analysis."
    caption: "Inspecting a different sample in the same test app."
    width: 425
    height: 368
  - type: image
    src: "/images/projects/early-neural-networks/noise-removal-1.webp"
    alt: "Noise-removal test application with a noisy original above a processed character image."
    caption: "Noise-removal example 1: original above, processed result below."
    width: 405
    height: 296
  - type: image
    src: "/images/projects/early-neural-networks/noise-removal-2.webp"
    alt: "A second noise-removal test showing the original and a result with much of the background cleared."
    caption: "Noise-removal example 2, a separate test image."
    width: 405
    height: 296
  - type: image
    src: "/images/projects/early-neural-networks/noise-removal-3.webp"
    alt: "A third original-and-processed pair in the noise-removal test application."
    caption: "Noise-removal example 3. These comparisons made remaining artifacts visible."
    width: 405
    height: 296
  - type: image
    src: "/images/projects/early-neural-networks/noise-removal-4.webp"
    alt: "A fourth comparison showing background lines in the original and isolated character shapes below."
    caption: "Noise-removal example 4, with the character shapes retained in the processed view."
    width: 405
    height: 296
  - type: image
    src: "/images/projects/early-neural-networks/noise-removal-5.webp"
    alt: "A fifth noise-removal comparison with residual marks around the processed characters."
    caption: "Noise-removal example 5. The results still needed inspection."
    width: 405
    height: 296
  - type: image
    src: "/images/projects/early-neural-networks/noise-removal-6.webp"
    alt: "A sixth test application screenshot comparing noisy text with the processed output."
    caption: "Noise-removal example 6, another input and its result."
    width: 405
    height: 296
---

## Getting useful shapes out of a messy image

During my time at [StarSoft Systems](/career/starsoft-systems/), I got pretty
deep into character recognition. These are some of the diagrams, screenshots,
and experiments I kept from that work. The images include the older text
CAPTCHAs from before reCAPTCHA.

There were three problems tangled together: cleaning up the image, separating
the characters, and figuring out what each character was. Segmentation was
always the hardest part. If two letters were still joined together, the
recognizer was already starting with the wrong thing.

## Removing noise without removing the letters

Early on, I worked with a professor at DeVry on an algorithm for removing
diagonal and horizontal interference. I built out C# processing tools around
this work, with grayscale conversion, connected regions, pixel counts across
rows and columns, and routines for dealing with lines and small artifacts.

The tricky part was where a background line crossed a letter. Removing the
whole line could take part of the letter with it. The processing needed to look
at the surrounding shape, too. Some of the routines were very specific to the
image formats I was working with.

I had a test application that showed the original and the processed image
together. You can see it in the screenshots below. The remaining specks and
damaged edges mattered just as much as the parts that cleaned up nicely.

## The Broom

I called my character-sweeping test app **The Broom**. I built it to experiment
with separating characters and to see what the processor was doing to each
sample.

One approach looked at the upper and lower outlines of the characters for
possible boundaries. Touching or overlapping letters made that difficult:
a connected shape could contain more than one character, and a narrow spot
could be part of a letter instead of a gap between two of them. Having a small
app where I could inspect those cases was useful.

## Working through the network design

I also built a convolutional neural network in C# from a research paper. We had
an intern label character images in a custom application for supervised
training. These are my network diagrams from that work.

[![Network sketch showing local image regions feeding into later layers through groups of connections.](/images/projects/early-neural-networks/network-local-connections.webp)](/images/projects/early-neural-networks/network-local-connections.webp)

*Local image regions and their connections to later layers. Open the diagram
to see it at its original size.*

[![A second network sketch with branching connections and additional layers outlined in magenta.](/images/projects/early-neural-networks/network-layer-layout.webp)](/images/projects/early-neural-networks/network-layer-layout.webp)

*Another layout exploring how the layers connect.*

I also wrote up a separate idea for learning the segmentation step itself:
using generated character examples with known boundaries to train a network
to suggest where the splits belonged. I kept the design note for that proposed
experiment along with these diagrams.

## Separating spoken numbers

I experimented with segmentation of audio CAPTCHAs containing spoken numbers,
too. This plot puts the waveform, signal energy, and detected peaks on the same
timeline so I could inspect where candidate segments fell.

[![Audio segmentation diagnostic plotting a blue waveform, green energy curve, and red detected peaks across about 25 seconds.](/images/projects/early-neural-networks/audio-segmentation.webp)](/images/projects/early-neural-networks/audio-segmentation.webp)

*Waveform, energy, and detected peaks from the spoken-number segmentation
experiment.*

The common thread was building tools that let me look at the intermediate
results. A final answer alone couldn't show whether the problem started in
cleanup, segmentation, or recognition. These pictures preserve some of that
work, including the rough edges. The source is staying private.
