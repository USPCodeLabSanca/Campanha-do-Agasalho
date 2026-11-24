import { useTranslation } from 'react-i18next'
import { MinusIcon, PlusIcon } from '@phosphor-icons/react'

import { MAX_QUANTITY } from '../../constants/shop'

type QuantityStepperProps = {
  label: string
  value: number
  onChange: (value: number) => void
}

const stepButtonClasses =
  'flex size-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-green-3 disabled:cursor-not-allowed disabled:opacity-40'

export function QuantityStepper({
  label,
  value,
  onChange,
}: QuantityStepperProps) {
  const { t } = useTranslation()

  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center gap-1 rounded-full border-2 border-blue-1 p-1"
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value === 1}
        aria-label={t('shop.dialog.decrease')}
        className={stepButtonClasses}
      >
        <MinusIcon size={16} aria-hidden="true" />
      </button>
      <output aria-live="polite" className="min-w-8 text-center text-button">
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value === MAX_QUANTITY}
        aria-label={t('shop.dialog.increase')}
        className={stepButtonClasses}
      >
        <PlusIcon size={16} aria-hidden="true" />
      </button>
    </div>
  )
}
