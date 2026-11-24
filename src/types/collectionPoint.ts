export type CollectionPoint = {
  id: string
  name: string
  address: string
  hours: string
  isActive: boolean
}

export type CollectionPointInput = Omit<CollectionPoint, 'id'>
