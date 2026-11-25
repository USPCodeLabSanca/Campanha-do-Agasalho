import { useTranslation } from 'react-i18next'
import { CaretDownIcon } from '@phosphor-icons/react'
import { Button } from '../Button'

type CollectionFiltersProps = {
  search: string
  neighborhood: string
  neighborhoods: string[]
  locating: boolean
  onSearchChange: (value: string) => void
  onNeighborhoodChange: (value: string) => void
  onClear: () => void
  onNearest: () => void
}

const fieldClasses =
  'h-11 w-full rounded-lg border border-blue-1/30 bg-white px-3 text-blue-1 placeholder:text-blue-1/50 focus:border-blue-1'

export function CollectionFilters({
  search,
  neighborhood,
  neighborhoods,
  locating,
  onSearchChange,
  onNeighborhoodChange,
  onClear,
  onNearest,
}: CollectionFiltersProps) {
  const { t } = useTranslation()

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-4 rounded-3xl border border-blue-1/20 bg-white p-6 md:flex-row md:items-end md:gap-6 md:px-10 md:py-8"
    >
      <label className="flex flex-1 flex-col gap-2 text-strong text-blue-1">
        {t('collection.filters.searchLabel')}
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('collection.filters.searchPlaceholder')}
          className={fieldClasses}
        />
      </label>

      <label className="flex flex-1 flex-col gap-2 text-strong text-blue-1">
        {t('collection.filters.neighborhoodLabel')}
        <span className="relative">
          <select
            value={neighborhood}
            onChange={(e) => onNeighborhoodChange(e.target.value)}
            className={`${fieldClasses} cursor-pointer appearance-none pr-10`}
          >
            <option value="">{t('collection.filters.allNeighborhoods')}</option>
            {neighborhoods.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <CaretDownIcon
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
          />
        </span>
      </label>

      <div className="flex flex-wrap gap-3">
        <Button variant="outlineDark" onClick={onClear}>
          {t('collection.filters.clear')}
        </Button>
        <Button variant="pink" onClick={onNearest} disabled={locating}>
          {locating
            ? t('collection.filters.locating')
            : t('collection.filters.nearest')}
        </Button>
      </div>
    </form>
  )
}
