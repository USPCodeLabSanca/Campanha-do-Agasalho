import { useTranslation } from 'react-i18next'
import { HandbagIcon } from '@phosphor-icons/react'

type BagButtonProps = {
  count: number
  onClick: () => void
}

export function BagButton({ count, onClick }: BagButtonProps) {
  const { t } = useTranslation()

  return (
    <div className="pointer-events-none sticky bottom-0 z-40 h-0">
      <button
        type="button"
        onClick={onClick}
        aria-label={t('shop.bag.open', { count })}
        className="pointer-events-auto absolute right-4 bottom-4 flex cursor-pointer items-center gap-2 rounded-full bg-blue-1 py-3 pr-3 pl-4 text-button text-white shadow-lg transition hover:brightness-130 sm:right-6 sm:bottom-6"
      >
        <HandbagIcon size={24} aria-hidden="true" />
        <span aria-hidden="true">{t('shop.bag.title')}</span>
        <span
          aria-hidden="true"
          className="flex size-7 items-center justify-center rounded-full bg-orange-1 text-small font-bold text-blue-1"
        >
          {count}
        </span>
      </button>
    </div>
  )
}
