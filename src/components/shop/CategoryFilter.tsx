import { useTranslation } from 'react-i18next'

import type { ProductCategory } from '../../types/product'

export type CategoryFilterValue = ProductCategory | 'all'

type CategoryFilterProps = {
  selected: CategoryFilterValue
  onSelect: (category: CategoryFilterValue) => void
}

const categories: CategoryFilterValue[] = [
  'all',
  'clothes',
  'mugs',
  'accessories',
]

const baseClasses =
  'cursor-pointer rounded-full border-2 border-blue-1 px-4 py-1.5 text-button transition'

const activeClasses = 'bg-blue-1 text-white'

const inactiveClasses = 'text-blue-1 hover:bg-white'

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const { t } = useTranslation()

  return (
    <div
      role="group"
      aria-label={t('shop.products.filterLabel')}
      className="flex flex-wrap gap-2"
    >
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          aria-pressed={selected === category}
          onClick={() => onSelect(category)}
          className={`${baseClasses} ${selected === category ? activeClasses : inactiveClasses}`}
        >
          {t(`shop.products.categories.${category}`)}
        </button>
      ))}
    </div>
  )
}
