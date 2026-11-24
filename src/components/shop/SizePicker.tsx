import { useTranslation } from 'react-i18next'

import { SizeGuide } from './SizeGuide'

import type { SizeMeasurement } from '../../types/product'

type SizePickerProps = {
  sizes: string[]
  sizeGuide?: SizeMeasurement[]
  selected: string | null
  onSelect: (size: string) => void
}

export function SizePicker({
  sizes,
  sizeGuide,
  selected,
  onSelect,
}: SizePickerProps) {
  const { t } = useTranslation()

  return (
    <fieldset>
      <legend className="text-strong">{t('shop.dialog.size')}</legend>

      <div className="mt-2 flex flex-wrap gap-2">
        {sizes.map((size) => (
          <label key={size}>
            <input
              type="radio"
              name="size"
              value={size}
              checked={selected === size}
              onChange={() => onSelect(size)}
              className="peer sr-only"
            />
            <span className="inline-flex min-w-12 cursor-pointer justify-center rounded-full border-2 border-blue-1 px-3 py-1.5 text-button transition peer-checked:bg-blue-1 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange-2 hover:bg-green-3 peer-checked:hover:bg-blue-1">
              {size}
            </span>
          </label>
        ))}
      </div>

      {sizeGuide && (
        <details className="mt-3">
          <summary className="w-fit cursor-pointer text-small font-bold underline decoration-orange-1 decoration-2 underline-offset-4 transition hover:text-orange-2">
            {t('shop.dialog.sizeGuide.toggle')}
          </summary>
          <div className="mt-3">
            <SizeGuide measurements={sizeGuide} />
          </div>
        </details>
      )}
    </fieldset>
  )
}
