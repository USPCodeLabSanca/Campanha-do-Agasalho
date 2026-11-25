import type { Entity, EntityInput } from '../types/entity'

let mockEntities: Entity[] = [
  {
    id: '1',
    name: 'Lar das Crianças',
    neighborhood: 'Vila Prado',
    targetAudience: {
      pt: 'Crianças e adolescentes',
      en: 'Children and teenagers',
    },
    contribution: {
      pt: 'Roupas infantis e calçados separados por tamanho',
      en: "Children's clothes and shoes sorted by size",
    },
    isActive: true,
  },
  {
    id: '2',
    name: 'Casa de Repouso Esperança',
    neighborhood: 'Centro',
    targetAudience: { pt: 'Idosos', en: 'Elderly people' },
    contribution: {
      pt: 'Cobertores, meias e blusas de frio',
      en: 'Blankets, socks and sweaters',
    },
    isActive: true,
  },
  {
    id: '3',
    name: 'Abrigo Recomeço',
    neighborhood: 'Cidade Aracy',
    targetAudience: {
      pt: 'Pessoas em situação de rua',
      en: 'People experiencing homelessness',
    },
    contribution: {
      pt: 'Agasalhos adultos e cobertores',
      en: 'Adult coats and blankets',
    },
    isActive: false,
  },
]

export async function getEntities(): Promise<Entity[]> {
  return mockEntities
}

export async function createEntity(input: EntityInput): Promise<Entity> {
  const entity = { id: crypto.randomUUID(), ...input }
  mockEntities = [...mockEntities, entity]
  return entity
}

export async function updateEntity(
  id: string,
  input: EntityInput,
): Promise<Entity> {
  const entity = { id, ...input }
  mockEntities = mockEntities.map((item) => (item.id === id ? entity : item))
  return entity
}

export async function deleteEntity(id: string): Promise<void> {
  mockEntities = mockEntities.filter((item) => item.id !== id)
}
