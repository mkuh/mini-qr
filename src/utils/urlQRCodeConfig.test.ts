import { describe, expect, it } from 'vitest'
import { findPresetByUrlValue, getUrlQRCodeSettings } from './urlQRCodeConfig'

describe('getUrlQRCodeSettings', () => {
  it('reads preset and data from the URL', () => {
    const settings = getUrlQRCodeSettings('?preset=Plain&data=https%3A%2F%2Fexample.com')

    expect(settings.preset).toBe('Plain')
    expect(settings.data).toBe('https://example.com')
  })

  it('reads color values from the URL', () => {
    const settings = getUrlQRCodeSettings(
      '?dotColor=ff0000&cornerSquareColor=%2300ff00&cornerDotColor=0000ff&bg=transparent'
    )

    expect(settings.dotsColor).toBe('#ff0000')
    expect(settings.cornersSquareColor).toBe('#00ff00')
    expect(settings.cornersDotColor).toBe('#0000ff')
    expect(settings.background).toBe('transparent')
  })

  it('returns undefined values when params are missing', () => {
    const settings = getUrlQRCodeSettings('')

    expect(settings.preset).toBeUndefined()
    expect(settings.data).toBeUndefined()
    expect(settings.dotsColor).toBeUndefined()
  })
})

describe('findPresetByUrlValue', () => {
  const presets = [{ name: 'Plain' }, { name: 'SP Digital' }]

  it('matches exact names and slug-like values', () => {
    expect(findPresetByUrlValue(presets, 'Plain')?.name).toBe('Plain')
    expect(findPresetByUrlValue(presets, 'sp-digital')?.name).toBe('SP Digital')
  })
})
