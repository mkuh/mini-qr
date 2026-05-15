export interface UrlQRCodeSettings {
  preset?: string
  data?: string
  dotsColor?: string
  cornersSquareColor?: string
  cornersDotColor?: string
  background?: string
}

export function getUrlQRCodeSettings(search = getCurrentSearch()): UrlQRCodeSettings {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
  const preset = params.get('preset')?.trim()
  const data = params.get('data')
  const dotsColor = getColorParam(params, ['dotColor', 'dotsColor'])
  const cornersSquareColor = getColorParam(params, ['cornerSquareColor', 'cornersSquareColor'])
  const cornersDotColor = getColorParam(params, ['cornerDotColor', 'cornersDotColor'])
  const background = getColorParam(params, ['bg', 'background'])
  return {
    preset: preset || undefined,
    data: data === null ? undefined : data,
    dotsColor,
    cornersSquareColor,
    cornersDotColor,
    background
  }
}

export function findPresetByUrlValue<T extends { name: string }>(
  presets: readonly T[],
  value: string | undefined
): T | undefined {
  if (!value) return undefined
  const normalized = normalizePresetLookup(value)
  return presets.find(
    (preset) => preset.name === value || normalizePresetLookup(preset.name) === normalized
  )
}

function getCurrentSearch(): string {
  if (typeof window === 'undefined') return ''
  return window.location.search
}

function normalizePresetLookup(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '')
}

function getColorParam(params: URLSearchParams, names: readonly string[]): string | undefined {
  for (const name of names) {
    const raw = params.get(name)
    if (raw == null) continue
    const value = normalizeColor(raw)
    if (value) return value
  }
  return undefined
}

function normalizeColor(value: string): string | undefined {
  const trimmed = value.trim()
  if (!trimmed) return undefined
  if (trimmed.toLowerCase() === 'transparent') return 'transparent'
  if (/^#?[0-9a-f]{3,8}$/i.test(trimmed)) {
    return `#${trimmed.replace(/^#/, '')}`
  }
  return undefined
}
