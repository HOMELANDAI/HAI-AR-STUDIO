# Engineering Instructions for Codex

## Mission
Build **HOMELANDAI AR Studio**, a professional Windows 11 browser-first AR performance production application. Protect the ability to livestream AND record simultaneously via OBS. Prioritize quality, correct tracking and resilient real-time operation over optional vendors.

## Baseline architecture
- React + TypeScript + Vite front-end.
- Three.js + React Three Fiber renderer and reusable GLB assets.
- MediaPipe Face Landmarker for the first real rigid head-pose tracking (separate from Pose/Holistic).
- MediaPipe Pose/Holistic for body and gestures. Do not mix 33 MediaPipe joints with 32 Kinect joints without an explicit retargeter.
- Kinect via native Windows C++/C# bridge AFTER device/SDK acceptance, never assume getUserMedia exposes Kinect depth/IMU.
- OBS 28+ WebSocket via private authenticated producer bridge; never expose credentials in browser bundles.
- Producer QR payloads must identify signed/authorized prepublished effect revisions, never arbitrary URLs or scripts.
- Portable assets: immutable source + validated GLB derivatives + tracking profiles + metadata + published revision.
- WebXR, NVIDIA, 8th Wall, ViroReact and native ARCore are optional future adapters. Do not add them as mandatory runtime dependencies.

## Required development discipline
1. Identify evidence level: working local runtime, typecheck/build tested, source-stated, or planned.
2. Before introducing a dependency, show which acceptance test it enables and why the existing stack cannot do so.
3. Favor small tested increments and clear package boundaries.
4. Do not present design-prototype effects as imported approved 3D assets.
5. No fake livestream indicators, fabricated readiness, or decorative buttons claiming functionality.
6. Respect user camera permissions and clean up tracks/workers/sessions.
7. Maintain fallback preview without a camera and clean passthrough on tracking loss.
8. No private keys, API tokens, webcam frames, or production recordings committed to Git.
9. Preserve the current architecture decisions in docs/MASTER_BUILD_SPEC.md and add any new decision to docs/ARCHITECTURE.md.
10. After editing, run npm run check and npm run build; log any unavailable tools explicitly instead of claiming success.

## First gated deliverable
Live HAI Verse Helmet with a verified GLB, calibrated 4x4 face transform, aligned webcam, and an OBS-composited test recording. The current procedural helmet is ONLY a graphics prototype.

## Definition of done
- Code checked in, reproducible dependency lockfile, clean install/build/tests.
- Demo behavior matches labels; no hidden simulated connectivity.
- Measured tracking stability and capture performance on Windows 11 hardware.
- Functional livestream AND recording, separately and simultaneously, verified with saved files.
- Security review for QR commands and OBS control.
- Test reports retained with versions, hardware, source assets and reproduction steps.
