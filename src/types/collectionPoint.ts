export type CollectionPoint = {
  id: string
  name: string
  address: string
  hours: string
  isActive: boolean
  neighborhood?: string
  lat?: number
  lng?: number
}

export type CollectionPointInput = Omit<CollectionPoint, 'id'>
export type MappablePoint = CollectionPoint & { lat: number; lng: number }
export type LatLng = { lat: number; lng: number }
