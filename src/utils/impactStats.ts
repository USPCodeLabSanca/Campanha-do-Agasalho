import type { Destination, Edition } from '../types/edition'

// Totais de todas as edições, usados no filtro "Todas"
export function getTotals(editions: Edition[]) {
  const record = editions.reduce((best, edition) =>
    edition.totalCollected > best.totalCollected ? edition : best,
  )

  return {
    firstYear: editions[0].year,
    editionsCount: editions.length,
    totalCollected: editions.reduce(
      (sum, edition) => sum + edition.totalCollected,
      0,
    ),
    volunteers: editions.reduce((sum, edition) => sum + edition.volunteers, 0),
    record,
  }
}

// Média da porcentagem de cada tipo de entidade entre as edições
export function getAverageDestinations(editions: Edition[]): Destination[] {
  const withData = editions.filter((edition) => edition.destinations)
  const types = withData[0]?.destinations?.map((item) => item.type) ?? []

  return types.map((type) => {
    const total = withData.reduce(
      (sum, edition) =>
        sum +
        (edition.destinations?.find((item) => item.type === type)?.percentage ??
          0),
      0,
    )

    return { type, percentage: Math.round(total / withData.length) }
  })
}
