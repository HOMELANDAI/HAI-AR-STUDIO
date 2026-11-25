export const PRESETS = {
  verse: {
    id: 'verse',
    name: 'HAI VERSE HELMET',
    description: 'Dark alloy shell with a vivid lyric display.',
    shell: '#18243b',
    visor: '#fd465c',
    accent: '#59d8ff',
    glow: 0.75,
    animated: true,
  },
  frozen: {
    id: 'frozen',
    name: 'FROZEN VERSE',
    description: 'Ice-lit experimental helmet treatment.',
    shell: '#8cc6e3',
    visor: '#caefff',
    accent: '#84e8ff',
    glow: 0.85,
    animated: true,
  },
  nomad: {
    id: 'nomad',
    name: 'NEON NOMAD',
    description: 'Cyberpunk dark plating and neon hardware.',
    shell: '#121624',
    visor: '#ba57e9',
    accent: '#00f0d3',
    glow: 0.95,
    animated: true,
  },
} as const

export type PresetId = keyof typeof PRESETS
export type HelmetPreset = {
  id: string
  name: string
  description: string
  shell: string
  visor: string
  accent: string
  glow: number
  animated: boolean
}

export const DRAFT_KEY = 'hai-studio.helmet-draft.v1'
const COLOR = /^#[0-9a-fA-F]{6}$/

export function validPreset(input: unknown): input is HelmetPreset {
  if (!input || typeof input !== 'object') return false
  const p = input as Record<string, unknown>
  return (
    typeof p.id === 'string' && p.id.length > 0 && p.id.length <= 64 &&
    typeof p.name === 'string' && p.name.length > 0 && p.name.length <= 80 &&
    typeof p.description === 'string' && p.description.length <= 256 &&
    typeof p.shell === 'string' && COLOR.test(p.shell) &&
    typeof p.visor === 'string' && COLOR.test(p.visor) &&
    typeof p.accent === 'string' && COLOR.test(p.accent) &&
    typeof p.glow === 'number' && Number.isFinite(p.glow) && p.glow >= 0 && p.glow <= 1 &&
    typeof p.animated === 'boolean'
  )
}

export function loadDraft(): HelmetPreset | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    return validPreset(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function saveDraft(preset: HelmetPreset): boolean {
  if (!validPreset(preset)) return false
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(preset))
    return true
  } catch {
    return false
  }
}

export function clearDraft(): void {
  try { localStorage.removeItem(DRAFT_KEY) } catch { /* storage may be unavailable */ }
}
