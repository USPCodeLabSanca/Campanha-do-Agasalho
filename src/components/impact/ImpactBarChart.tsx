import { useTranslation } from 'react-i18next'

import type { Edition } from '../../types/edition'
import type { EditionFilter } from './EditionSelector'
import { formatCompact } from '../../utils/formatCompact'

type ImpactBarChartProps = {
  editions: Edition[]
  selected: EditionFilter
}

const barClasses = {
  default: 'bg-blue-4',
  active: 'bg-orange-1',
  ongoing:
    'bg-[repeating-linear-gradient(135deg,var(--color-blue-4)_0_8px,var(--color-blue-5)_8px_16px)]',
  ongoingActive:
    'bg-[repeating-linear-gradient(135deg,var(--color-orange-1)_0_8px,var(--color-orange-4)_8px_16px)]',
}

function getBarClass(edition: Edition, isActive: boolean) {
  if (edition.isOngoing) {
    return isActive ? barClasses.ongoingActive : barClasses.ongoing
  }
  return isActive ? barClasses.active : barClasses.default
}

export function ImpactBarChart({ editions, selected }: ImpactBarChartProps) {
  const { t, i18n } = useTranslation()

  const maxValue = Math.max(
    ...editions.map((edition) => edition.totalCollected),
  )
  const hasOngoing = editions.some((edition) => edition.isOngoing)

  return (
    <article
      aria-labelledby="impact-chart-title"
      className="h-full card p-6 sm:p-8"
    >
      <h3 id="impact-chart-title" className="text-h4">
        {t('impact.numbers.chart.title')}
      </h3>
      <p className="mt-1 text-small text-blue-4">
        {selected === 'all'
          ? t('impact.numbers.chart.hintAll')
          : t('impact.numbers.chart.hintYear')}
      </p>

      <div aria-hidden="true">
        <div className="mt-6 flex h-56 items-end gap-2 border-b-2 border-gray-2 sm:gap-4">
          {editions.map((edition) => (
            <div
              key={edition.year}
              className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
            >
              <span className="text-caption font-bold whitespace-nowrap sm:text-small sm:font-bold">
                {formatCompact(edition.totalCollected, i18n.resolvedLanguage)}
              </span>
              <div
                className={`w-full max-w-18 rounded-t-xl ${getBarClass(edition, selected === edition.year)}`}
                style={{
                  height: `${(edition.totalCollected / maxValue) * 85}%`,
                }}
              />
            </div>
          ))}
        </div>

        <div className="mt-2 flex gap-2 sm:gap-4">
          {editions.map((edition) => (
            <span
              key={edition.year}
              className={`min-w-0 flex-1 text-center text-small ${selected === edition.year ? 'font-bold underline decoration-orange-1 decoration-2 underline-offset-4' : ''}`}
            >
              {edition.year}
            </span>
          ))}
        </div>

        {hasOngoing && (
          <p className="mt-4 flex items-center gap-2 text-small text-blue-4">
            <span className={`h-3 w-4 rounded ${barClasses.ongoing}`} />
            {t('impact.numbers.chart.legend')}
          </p>
        )}
      </div>

      <table className="sr-only">
        <caption>{t('impact.numbers.chart.title')}</caption>
        <thead>
          <tr>
            <th>{t('impact.numbers.chart.edition')}</th>
            <th>{t('impact.numbers.chart.pieces')}</th>
          </tr>
        </thead>
        <tbody>
          {editions.map((edition) => (
            <tr key={edition.year}>
              <td>
                {edition.year}
                {edition.isOngoing && ` (${t('impact.numbers.ongoing')})`}
              </td>
              <td>{edition.totalCollected}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}
