import { useTranslation } from 'react-i18next'

import type { Edition } from '../../types/edition'

export type EditionFilter = number | 'all'

type EditionSelectorProps = {
  editions: Edition[]
  selected: EditionFilter
  onSelect: (filter: EditionFilter) => void
}

const baseClasses =
  'inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-blue-1 px-4 py-1.5 text-button transition'

const activeClasses = 'bg-blue-1 text-white'

const inactiveClasses = 'text-blue-1 hover:bg-white'

export function EditionSelector({
  editions,
  selected,
  onSelect,
}: EditionSelectorProps) {
  const { t } = useTranslation()

  return (
    <div
      role="group"
      aria-label={t('impact.numbers.selectorLabel')}
      className="flex flex-wrap gap-2"
    >
      <button
        type="button"
        aria-pressed={selected === 'all'}
        onClick={() => onSelect('all')}
        className={`${baseClasses} ${selected === 'all' ? activeClasses : inactiveClasses}`}
      >
        {t('impact.numbers.all')}
      </button>

      {editions.map((edition) => (
        <button
          key={edition.year}
          type="button"
          aria-pressed={selected === edition.year}
          onClick={() => onSelect(edition.year)}
          className={`${baseClasses} ${selected === edition.year ? activeClasses : inactiveClasses}`}
        >
          {edition.year}
          {edition.isOngoing && (
            <span className="rounded-full bg-orange-3 px-2 text-small text-blue-1">
              {t('impact.numbers.ongoing')}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
