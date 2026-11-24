export type DestinationType =
  'shelters' | 'elderly' | 'childcare' | 'socialProjects' | 'families'

export type Destination = {
  type: DestinationType
  percentage: number
}

export type Edition = {
  year: number
  totalCollected: number
  totalCollectionPoints: number
  totalBeneficiaryEntities: number
  volunteers: number
  isOngoing?: boolean
  destinations?: Destination[]
}
