import type {
  CollectionPoint,
  CollectionPointInput,
} from '../types/collectionPoint'

let mockCollectionPoints: CollectionPoint[] = [
  {
    id: '1',
    name: 'Biblioteca Central',
    address: 'Av. Trabalhador São-carlense, 400',
    hours: 'Seg a sex, 8h às 22h',
    isActive: true,
  },
  {
    id: '2',
    name: 'Restaurante Universitário',
    address: 'Área 1 do campus',
    hours: 'Seg a sex, 11h às 14h',
    isActive: true,
  },
  {
    id: '3',
    name: 'Centro Acadêmico',
    address: 'Bloco E1, térreo',
    hours: 'Seg a sex, 9h às 18h',
    isActive: false,
  },
]

export async function getCollectionPoints(): Promise<CollectionPoint[]> {
  return mockCollectionPoints
}

export async function createCollectionPoint(
  input: CollectionPointInput,
): Promise<CollectionPoint> {
  const point = { id: crypto.randomUUID(), ...input }
  mockCollectionPoints = [...mockCollectionPoints, point]
  return point
}

export async function updateCollectionPoint(
  id: string,
  input: CollectionPointInput,
): Promise<CollectionPoint> {
  const point = { id, ...input }
  mockCollectionPoints = mockCollectionPoints.map((item) =>
    item.id === id ? point : item,
  )
  return point
}

export async function deleteCollectionPoint(id: string): Promise<void> {
  mockCollectionPoints = mockCollectionPoints.filter((item) => item.id !== id)
}
