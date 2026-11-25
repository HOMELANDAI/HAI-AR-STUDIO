import { useState } from 'react'
import { HelmetScene } from './features/helmet/HelmetScene'
import { PRESETS, clearDraft, loadDraft, saveDraft } from './domain/presets'
import type { HelmetPreset, PresetId } from './domain/presets'

type Tab = 'effects' | 'controls' | 'production'
const initial = PRESETS.verse as HelmetPreset

export default function App() {
  const [preset, setPreset] = useState<HelmetPreset>(() => loadDraft() ?? initial)
  const [activePreset, setActivePreset] = useState<PresetId>(() => {
    const draft = loadDraft()
    return draft && draft.id in PRESETS ? draft.id as PresetId : 'verse'
  })
  const [tab, setTab] = useState<Tab>('effects')
  const [notice, setNotice] = useState('')

  const selectPreset = (id: PresetId) => {
    setActivePreset(id)
    setPreset({ ...PRESETS[id] })
    setNotice('Preset loaded in the preview only.')
  }
  const update = (values: Partial<HelmetPreset>) => {
    setPreset((p) => ({ ...p, ...values }))
    setNotice('Unsaved local draft.')
  }
  const save = () => {
    setNotice(saveDraft(preset) ? 'Draft saved locally in this browser.' : 'Draft not saved: storage unavailable.')
  }
  const reset = () => {
    clearDraft()
    setPreset({ ...PRESETS[activePreset] })
    setNotice('Local draft cleared.')
  }
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Main navigation">
        <div className="brand"><div className="brand-mark">H</div><div><strong>HAI</strong><small>AR STUDIO</small></div></div>
        <div className="nav-label">WORKSPACE</div>
        <nav>
          <button className={tab === 'effects' ? 'nav-button active' : 'nav-button'} onClick={() => setTab('effects')}>◇ <span>Effect Library</span></button>
          <button className={tab === 'controls' ? 'nav-button active' : 'nav-button'} onClick={() => setTab('controls')}>◎ <span>Customization</span></button>
          <button className={tab === 'production' ? 'nav-button active' : 'nav-button'} onClick={() => setTab('production')}>▣ <span>Production</span></button>
        </nav>
        <div className="sidebar-bottom"><span className="status-dot" /> Foundation prototype <small>v0.1 • No live hardware connection</small></div>
      </aside>
      <main className="main">
        <header className="topbar"><div><span className="eyebrow">HOMELANDAI / CREATIVE SYSTEMS</span><h1>AR Production Workspace</h1></div><span className="chip">● LOCAL DESIGN PREVIEW</span></header>
        <div className="workspace">
          <section className="stage-panel" aria-label="3D helmet preview">
            <div className="stage-meta"><span>STUDIO VIEWPORT <b>/ 01</b></span><span className="stage-pill">PROCEDURAL PROTOTYPE</span></div>
            <div className="viewport"><HelmetScene preset={preset} /></div>
            <div className="stage-bottom"><div><strong>{preset.name}</strong><p>Drag to rotate • Scroll to zoom • Not face tracked</p></div><span className="coordinate">PREVIEW ENGINE / THREE.JS</span></div>
          </section>
          <section className="inspector">
            {tab === 'effects' && <>
              <div className="panel-heading"><span className="eyebrow">ASSET VAULT / DEMO</span><h2>Effect Library</h2><p>Select a concept preset to preview the helmet colorway.</p></div>
              <div className="preset-list">{(Object.keys(PRESETS) as PresetId[]).map((id) => (
                <button key={id} className={activePreset === id ? 'preset-card selected' : 'preset-card'} onClick={() => selectPreset(id)}>
                  <span className="preset-swatch" style={{ background: PRESETS[id].accent }} />
                  <span><strong>{PRESETS[id].name}</strong><small>{PRESETS[id].description}</small></span>
                  <span className="preset-arrow">↗</span>
                </button>
              ))}</div>
              <div className="hint">Concept presets are original procedural placeholders. Production GLB models have not yet been imported.</div>
            </>}
            {tab === 'controls' && <>
              <div className="panel-heading"><span className="eyebrow">DESIGN PARAMETERS</span><h2>Helmet Controls</h2><p>Customize the viewport and preserve a local draft.</p></div>
              <div className="control-grid">
                {([
                  ['shell', 'Shell material'],
                  ['visor', 'Visor color'],
                  ['accent', 'Lighting accent']
                ] as const).map(([field, label]) => (
                  <label className="color-control" key={field}><span>{label}</span><input type="color" value={preset[field]} onChange={(e) => update({ [field]: e.target.value })} /></label>
                ))}
                <label className="range-control"><span>Emission strength <b>{Math.round(preset.glow * 100)}%</b></span><input type="range" min={0} max={1} step={0.01} value={preset.glow} onChange={(e) => update({ glow: Number(e.target.value) })} /></label>
                <label className="toggle-control"><input type="checkbox" checked={preset.animated} onChange={(e) => update({ animated: e.target.checked })} /><span>Idle animation</span></label>
                <div className="action-row"><button className="primary" onClick={save}>Save local draft</button><button className="secondary" onClick={reset}>Reset</button></div>
              </div>
            </>}
            {tab === 'production' && <>
              <div className="panel-heading"><span className="eyebrow">CONTROL ROOM</span><h2>Production Readiness</h2><p>The runtime adapters below will be implemented and verified in later milestones.</p></div>
              <div className="readiness">
                <div><span>3D preview</span><strong className="ready">Prototype ready</strong></div>
                <div><span>Webcam + MediaPipe</span><strong className="pending">Not connected</strong></div>
                <div><span>Azure Kinect</span><strong className="pending">Not connected</strong></div>
                <div><span>OBS stream / record</span><strong className="pending">Not connected</strong></div>
                <div><span>Producer QR controls</span><strong className="pending">Not implemented</strong></div>
              </div>
              <div className="hint">This page does not start or stop livestreams or recordings. OBS control requires an authenticated backend bridge and real hardware testing.</div>
            </>}
            {notice && <p className="notice" role="status">{notice}</p>}
          </section>
        </div>
        <footer>HAI AR STUDIO <span>ENGINEERING PREVIEW · BUILT FOR THE LIVE EXPERIENCE</span></footer>
      </main>
    </div>
  )
}
