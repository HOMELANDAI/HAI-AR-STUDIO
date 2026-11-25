# Architecture and ADR Log

## Intended module graph
```text
React Producer UI
    |-- Asset Vault / revisioned presets
    |-- Camera / TrackingProvider (MediaPipe; optional Kinect bridge)
    |-- Three.js Scene + GLB renderer
    |-- ShowController -> authenticated localhost ProducerBridge -> OBS WebSocket
    |-- QR scanner -> authorization -> published preset ID only
    |-- Metrics / error handling / fallback
```

## ADR-001 (accepted): browser-first + native adapters
React/Three.js runs on Windows 11; hardware APIs unavailable in the browser are accessed via narrowly scoped local native services. Benefits: development portability, separable Kinect acceptance, no lock-in.

## ADR-002 (accepted): tracking-independent effects
Each renderer effect consumes a normalized, timestamped tracking result. Provider-specific face matrices, joint mappings, mirroring and calibration remain in adapters; never silently reinterpret coordinates.

## ADR-003 (accepted): separate draft and published preset
User editing must not mutate the show-active revision. Producer input can only reference allowed published identifiers and cannot execute code.

## ADR-004 (accepted): OBS is separate from preview
The preview is not evidence of OBS, livestream or recording. OBS state must come from the server bridge and readback/recorded file verification, including both outputs at once.

## ADR-005 (accepted): incremental optional integrations
No required NVIDIA, 8th Wall, WebXR, mobile ARCore or ViroReact dependency for the Windows application MVP. Add only after a comparative benchmark or a native mobile deliverable.

## ADR-006 (accepted): graphics prototype is not AR tracking
The M0 helmet is procedural Three.js geometry. It cannot be advertised as a Glowhouse 3D asset or a working webcam-tracked mask.

## Future decision points
- Persistent Asset Vault schema/storage choice and migration plan.
- Native bridge protocol, sampling and clock synchronization.
- Production capture compositing technique and OBS source strategy.
- Multi-person face/body tracking, calibration, quality thresholds.
- Runtime licensing, hardware constraints and deployment strategy.
