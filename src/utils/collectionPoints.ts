import type {
  CollectionPoint,
  LatLng,
  MappablePoint,
} from '../types/collectionPoint'

export function hasCoords(point: CollectionPoint): point is MappablePoint {
  return typeof point.lat === 'number' && typeof point.lng === 'number'
}

export function normalize(text: string) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
}

export function distanceKm(a: LatLng, b: LatLng) {
  const R = 6371
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

export function findNearest<T extends CollectionPoint & LatLng>(
  origin: LatLng,
  points: T[],
): T | null {
  let best: T | null = null
  let bestDistance = Infinity
  for (const point of points) {
    const d = distanceKm(origin, point)
    if (d < bestDistance) {
      best = point
      bestDistance = d
    }
  }
  return best
}

export function googleMapsUrl(point: CollectionPoint) {
  const query =
    typeof point.lat === 'number' && typeof point.lng === 'number'
      ? `${point.lat},${point.lng}`
      : encodeURIComponent(`${point.name}, ${point.address}`)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}
