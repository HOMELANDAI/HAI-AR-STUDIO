import { describe, expect, it } from 'vitest'
import { PRESETS, validPreset } from './presets'

describe('preset schema', () => {
  it('accepts all published sample preset definitions', () => {
    for (const preset of Object.values(PRESETS)) expect(validPreset(preset)).toBe(true)
  })
  it('rejects non-hex colors', () => {
    expect(validPreset({ ...PRESETS.verse, shell: 'url(javascript:alert(1))' })).toBe(false)
  })
  it('rejects invalid glow values', () => {
    expect(validPreset({ ...PRESETS.verse, glow: Number.NaN })).toBe(false)
    expect(validPreset({ ...PRESETS.verse, glow: 3 })).toBe(false)
  })
  it('rejects malformed persisted JSON structures', () => {
    expect(validPreset(null)).toBe(false)
    expect(validPreset([])).toBe(false)
    expect(validPreset({ ...PRESETS.verse, animated: 'yes' })).toBe(false)
  })
})
