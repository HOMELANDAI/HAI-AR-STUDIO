# HAI AR Studio — Master Build Specification

**Version:** 0.1, 2026-11-25. **Status:** approved architecture, initial bootstrap; NOT a completed product.

## Goal
A high-quality Windows 11 AR live-performance studio for HOMELANDAI originals, combining face helmets, body/hybrid Glowhouse creations, live effects, producer controls, and independent OBS livestreaming and recording.

## Functional requirements

| ID | Requirement | Acceptance |
|---|---|---|
| F-01 | React production interface | Responsive UI; no false indication of connection |
| F-02 | Three.js rendering | Validated GLB previews; controls and errors |
| F-03 | Face helmet tracking | MediaPipe dedicated Face Landmarker 4x4 matrix; calibration/occlusion quality checked |
| F-04 | Body/hybrid tracking | MediaPipe 33-joint mapping with documented rig retargeting |
| F-05 | Azure Kinect | Windows native bridge, calibration, synchronized 32-joint tracking, hardware diagnostics |
| F-06 | Asset Vault | Immutable sources, derivative GLB, preview, versioned editable/published presets |
| F-07 | Producer QR | Authenticate, authorize, audit signed preset activation; never load arbitrary URLs |
| F-08 | OBS | Independently control stream and record, verify simultaneous operation, recover disconnects |
| F-09 | Resilience | Clean passthrough, tracking-loss handling, device errors, degraded modes |
| F-10 | Measurable quality | Frame-time metrics, latency, GPU use, playback QA, integration tests |

## User experiences
- Select original HOMELANDAI mask or character in Asset Vault.
- Calibrate and customize geometry, color, effects, motion and safe triggers.
- Start camera session with explicit consent.
- Perform live while the tracked effect stays aligned.
- Producer activates published revisions via allow-listed UI or QR triggers.
- OBS delivers live and recorded composites simultaneously.

## Phase gates
**M0 Foundation:** runnable React/Three scene, procedural placeholder helmet, typed domain and provider contracts, unit tests, CI.

**M1 Real helmet:** import approved HAI Verse Helmet GLB; webcam; MediaPipe Face Landmarker; camera/renderer calibration; tracking recovery; local output.

**M2 Asset Vault:** immutable import, GLB validation, preset editor, local persistence, material/animation profiles and revisions.

**M3 Full body:** MediaPipe pose and one validated rigged Glowhouse character; 32-to-33-joint mapping study and Kinect native device acceptance before bridge activation.

**M4 Live production:** authenticated local OBS bridge; show controls; independent stream and record; simultaneous output acceptance; producer QR authorization; auditing.

**M5 Quality hardening:** repeated performance tests, crash recovery, source asset checks, privacy controls, packaging, documentation.

**M6 Optional expansion:** NVIDIA Broadcast and AR SDK benchmarks, WebXR on supported devices, ViroReact native mobile, sky effects when justified.

## Constraints and risks
- Concept images are not ready-to-render rigged GLB assets. Do not claim otherwise.
- Azure Kinect SDK is archived; require Windows 11 hardware/firmware verification.
- 8th Wall historical hand tracking is not included in current open engine; use MediaPipe for hands.
- Native iOS/Android ARCore and ViroReact do not execute inside the Windows Three.js renderer.
- WebXR sessions do not substitute for webcam compositing or OBS recording.
- Keep provider selection modular and evidence based.

## Acceptance evidence
Record command output, SDK versions, OS/GPU/camera identifiers (non-sensitive), observed render/track latency, OBS recording playback, and whether tests were simulated or on physical hardware.
