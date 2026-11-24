import type { Edition } from '../types/edition'

const mockEditions: Edition[] = [
  {
    year: 2020,
    totalCollected: 210000,
    totalCollectionPoints: 8,
    totalBeneficiaryEntities: 14,
    volunteers: 90,
    destinations: [
      { type: 'shelters', percentage: 40 },
      { type: 'elderly', percentage: 22 },
      { type: 'childcare', percentage: 15 },
      { type: 'socialProjects', percentage: 13 },
      { type: 'families', percentage: 10 },
    ],
  },
  {
    year: 2021,
    totalCollected: 330000,
    totalCollectionPoints: 12,
    totalBeneficiaryEntities: 17,
    volunteers: 130,
    destinations: [
      { type: 'shelters', percentage: 39 },
      { type: 'elderly', percentage: 22 },
      { type: 'childcare', percentage: 16 },
      { type: 'socialProjects', percentage: 14 },
      { type: 'families', percentage: 9 },
    ],
  },
  {
    year: 2022,
    totalCollected: 410000,
    totalCollectionPoints: 14,
    totalBeneficiaryEntities: 19,
    volunteers: 160,
    destinations: [
      { type: 'shelters', percentage: 38 },
      { type: 'elderly', percentage: 23 },
      { type: 'childcare', percentage: 17 },
      { type: 'socialProjects', percentage: 14 },
      { type: 'families', percentage: 8 },
    ],
  },
  {
    year: 2023,
    totalCollected: 480000,
    totalCollectionPoints: 16,
    totalBeneficiaryEntities: 20,
    volunteers: 180,
    destinations: [
      { type: 'shelters', percentage: 38 },
      { type: 'elderly', percentage: 22 },
      { type: 'childcare', percentage: 18 },
      { type: 'socialProjects', percentage: 15 },
      { type: 'families', percentage: 7 },
    ],
  },
  {
    year: 2024,
    totalCollected: 560000,
    totalCollectionPoints: 15,
    totalBeneficiaryEntities: 22,
    volunteers: 190,
    destinations: [
      { type: 'shelters', percentage: 36 },
      { type: 'elderly', percentage: 24 },
      { type: 'childcare', percentage: 19 },
      { type: 'socialProjects', percentage: 14 },
      { type: 'families', percentage: 7 },
    ],
  },
  {
    year: 2025,
    totalCollected: 620000,
    totalCollectionPoints: 18,
    totalBeneficiaryEntities: 24,
    volunteers: 210,
    destinations: [
      { type: 'shelters', percentage: 35 },
      { type: 'elderly', percentage: 23 },
      { type: 'childcare', percentage: 20 },
      { type: 'socialProjects', percentage: 15 },
      { type: 'families', percentage: 7 },
    ],
  },
  {
    year: 2026,
    totalCollected: 350000,
    totalCollectionPoints: 18,
    totalBeneficiaryEntities: 21,
    volunteers: 200,
    isOngoing: true,
    destinations: [
      { type: 'shelters', percentage: 40 },
      { type: 'elderly', percentage: 21 },
      { type: 'childcare', percentage: 17 },
      { type: 'socialProjects', percentage: 15 },
      { type: 'families', percentage: 7 },
    ],
  },
]

export async function getEditions(): Promise<Edition[]> {
  return mockEditions
}
