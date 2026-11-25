import type { LatLng } from '../types/collectionPoint'

const NUMBER = '(-?\\d+(?:\\.\\d+)?)'

const PATTERNS = [
  new RegExp(`!3d${NUMBER}!4d${NUMBER}`),
  new RegExp(`[?&](?:q|query|ll)=${NUMBER},\\s*${NUMBER}`),
  new RegExp(`@${NUMBER},${NUMBER}`),
]

export function parseMapsLink(link: string): LatLng | null {
  let text = link.trim()
  try {
    text = decodeURIComponent(text)
  } catch {
    // mantém o texto original
  }

  for (const pattern of PATTERNS) {
    const match = text.match(pattern)
    if (!match) continue

    const lat = Number(match[1])
    const lng = Number(match[2])

    if (Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
      return { lat, lng }
    }
  }

  return null
}
