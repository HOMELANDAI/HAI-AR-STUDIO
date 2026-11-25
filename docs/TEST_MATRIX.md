# Test Matrix — M0 to M4

| Test | Phase | Environment | Pass criterion |
|---|---|---|---|
| Published concept preset schema valid | M0 | Vitest | All local preset examples pass |
| Invalid colors and out-of-range values rejected | M0 | Vitest | Validation rejects malformed drafts |
| Browser scene renders and orbits | M0 | Real WebGL browser | Visible helmet; motion/orbit controlled |
| Controls update material/color | M0 | Browser | Visually observable changes |
| Draft persistence | M0 | Browser | Reload restores valid draft; reset clears |
| WebGL unavailable | M0 | Browser with disabled WebGL | Clear fallback, no false success |
| Helmet calibration | M1 | Windows webcam | Stable overlay and documented coordinate convention |
| Face loss/recovery | M1 | Windows webcam | Mask hides/cleans without stale pose or crash |
| Asset ingestion | M2 | Local GLB input | glTF validity and provenance retained |
| Body rig | M3 | Windows webcam | Repeatable skeleton mapping and rig motion |
| Kinect bridge | M3 | Windows 11 + Azure Kinect | Depth/rgb/joints calibrated and timestamped |
| OBS stream only | M4 | OBS + streaming target | Readback and remote playback confirmed |
| OBS record only | M4 | OBS + local media | Completed playable recording confirmed |
| OBS both | M4 | OBS + remote playback + local file | Simultaneous broadcast and playable saved file |
| QR unauthorized | M4 | Producer control gateway | Rejected and audited |
| OBS disconnected | M4 | OBS not running | Clear error, no fabricated LIVE state |

No hardware tests or hosted CI results were available at first authoring.
