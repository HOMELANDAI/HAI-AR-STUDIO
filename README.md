# HOMELANDAI AR Studio

Windows 11 browser-first AR production studio, built with React, TypeScript, Three.js, MediaPipe, an optional Azure Kinect native bridge, and OBS Studio.

This repository is the **source of truth for executable code**. The HAI KNOWLEDGE project provides source-grounded implementation research; research findings are not automatically accepted as runtime dependencies.

## Current milestone

**M0 — Foundation bootstrap.** First application is a 3D **procedural schematic** of the HAI Verse Helmet, with editable effect presets and local draft persistence. It is not yet a face-tracked, imported, production-ready helmet.

## Quick start

1. Install Node.js 22.16+ and Git.
2. Run `npm install`.
3. Run `npm run dev` and open the displayed localhost URL.
4. Run `npm run check`, `npm test`, and `npm run build`.

The initial bootstrap does not include an npm lockfile because dependency installation was not available in the authoring environment. Generate and commit `package-lock.json` using a trusted local install before changing CI to `npm ci`.

## Project principles

- Functionality before SDK proliferation.
- Explicit interfaces for tracking providers, renderer, assets and OBS.
- Source concept images are not treated as production GLB assets.
- Demo controls never imply real camera tracking, hardware connection or broadcast state.
- Never expose OBS WebSocket credentials, secret keys or native privileged endpoints in browser code.
- Store published presets separately from mutable drafts.
- Verify Kinect, camera, GPU and OBS features on actual Windows 11 hardware.

Read [AGENTS.md](AGENTS.md), [Master Build Specification](docs/MASTER_BUILD_SPEC.md), and [Architecture](docs/ARCHITECTURE.md) before changing the stack.

**Status:** Initial implementation in progress; no hardware, webcam tracking, OBS, livestream or Kinect functionality has been certified.
