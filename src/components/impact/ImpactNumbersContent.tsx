import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { StatCard } from '../StatCard'
import { EditionSelector, type EditionFilter } from './EditionSelector'
import { ImpactBarChart } from './ImpactBarChart'
import { ImpactDestinations } from './ImpactDestinations'

import type { Edition } from '../../types/edition'
import { formatCompact } from '../../utils/formatCompact'
import { getAverageDestinations, getTotals } from '../../utils/impactStats'

const MAX_EDITIONS = 5

type ImpactNumbersContentProps = {
  editions: Edition[]
}

export function ImpactNumbersContent({ editions }: ImpactNumbersContentProps) {
  const { t, i18n } = useTranslation()
  const [selected, setSelected] = useState<EditionFilter>('all')

  const language = i18n.resolvedLanguage
  const recentEditions = editions.slice(-MAX_EDITIONS)
  const selectedEdition = editions.find((edition) => edition.year === selected)

  function getStats() {
    if (!selectedEdition) {
      const totals = getTotals(editions)

      return [
        {
          value: formatCompact(totals.totalCollected, language),
          title: t('impact.numbers.stats.pieces'),
          subtitle: t('impact.numbers.stats.since', { year: totals.firstYear }),
        },
        {
          value: String(totals.editionsCount),
          title: t('impact.numbers.stats.editions'),
          subtitle: t('impact.numbers.stats.since', { year: totals.firstYear }),
        },
        {
          value: formatCompact(totals.volunteers, language),
          title: t('impact.numbers.stats.volunteers'),
          subtitle: t('impact.numbers.stats.allEditions'),
        },
        {
          value: formatCompact(totals.record.totalCollected, language),
          title: t('impact.numbers.stats.record'),
          subtitle: t('impact.numbers.stats.edition', {
            year: totals.record.year,
          }),
        },
      ]
    }

    return [
      {
        value: formatCompact(selectedEdition.totalCollected, language),
        title: t('impact.numbers.stats.pieces'),
        subtitle: selectedEdition.isOngoing
          ? t('impact.numbers.stats.soFar')
          : t('impact.numbers.stats.edition', { year: selectedEdition.year }),
      },
      {
        value: String(selectedEdition.totalCollectionPoints),
        title: t('impact.numbers.stats.collectionPoints'),
        subtitle: t('impact.numbers.stats.collectionPointsPlace'),
      },
      {
        value: String(selectedEdition.totalBeneficiaryEntities),
        title: t('impact.numbers.stats.entities'),
        subtitle: t('impact.numbers.stats.inYear', {
          year: selectedEdition.year,
        }),
      },
      {
        value: String(selectedEdition.volunteers),
        title: t('impact.numbers.stats.volunteers'),
        subtitle: t('impact.numbers.stats.teams'),
      },
    ]
  }

  return (
    <>
      <div className="mt-6">
        <EditionSelector
          editions={recentEditions}
          selected={selected}
          onSelect={setSelected}
        />
      </div>

      {selectedEdition?.isOngoing && (
        <p className="mt-4 max-w-2xl rounded-xl bg-orange-3 px-4 py-3 text-small">
          {t('impact.numbers.ongoingNotice', { year: selectedEdition.year })}
        </p>
      )}

      <ul
        role="list"
        className="mt-6 grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4"
      >
        {getStats().map((stat) => (
          <li key={stat.title}>
            <StatCard
              value={stat.value}
              title={stat.title}
              subtitle={stat.subtitle}
            />
          </li>
        ))}
      </ul>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ImpactBarChart editions={recentEditions} selected={selected} />
        <ImpactDestinations
          destinations={
            selectedEdition
              ? (selectedEdition.destinations ?? [])
              : getAverageDestinations(editions)
          }
          note={
            selectedEdition
              ? t('impact.numbers.destinations.noteYear', {
                  year: selectedEdition.year,
                })
              : t('impact.numbers.destinations.noteAll')
          }
        />
      </div>
    </>
  )
}
