import type { Milestone, MilestoneInput } from '../types/milestone'

let mockMilestones: Milestone[] = [
  {
    id: '1',
    year: 2007,
    title: { pt: 'Primeira edição', en: 'First edition' },
    description: {
      pt: 'Estudantes espalham as primeiras caixas de coleta pelo campus.',
      en: 'Students set up the first collection boxes around campus.',
    },
  },
  {
    id: '2',
    year: 2015,
    title: { pt: 'A campanha cresce', en: 'The campaign grows' },
    description: {
      pt: 'Os pontos de coleta chegam a outros lugares da cidade.',
      en: 'Collection points reach other places in the city.',
    },
  },
  {
    id: '3',
    year: 2026,
    title: { pt: 'Site novo', en: '' },
    description: {
      pt: 'A campanha ganha um site feito pelo USP CodeLab.',
      en: '',
    },
  },
]

export async function getMilestones(): Promise<Milestone[]> {
  return mockMilestones
}

export async function createMilestone(
  input: MilestoneInput,
): Promise<Milestone> {
  const milestone = { id: crypto.randomUUID(), ...input }
  mockMilestones = [...mockMilestones, milestone]
  return milestone
}

export async function updateMilestone(
  id: string,
  input: MilestoneInput,
): Promise<Milestone> {
  const milestone = { id, ...input }
  mockMilestones = mockMilestones.map((item) =>
    item.id === id ? milestone : item,
  )
  return milestone
}

export async function deleteMilestone(id: string): Promise<void> {
  mockMilestones = mockMilestones.filter((item) => item.id !== id)
}
