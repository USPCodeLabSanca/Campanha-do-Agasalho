import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TrashIcon, WhatsappLogoIcon, XIcon } from '@phosphor-icons/react'

import { ProductImage } from './ProductImage'
import { QuantityStepper } from './QuantityStepper'

import { useContacts } from '../../hooks/useContacts'
import { getWhatsappUrl } from '../../utils/getWhatsappUrl'
import type { BagItem } from '../../types/bag'
import { formatPrice } from '../../utils/formatPrice'

type BagDrawerProps = {
  items: BagItem[]
  totalPrice: number
  onUpdateQuantity: (key: string, quantity: number) => void
  onRemove: (key: string) => void
  onClear: () => void
  onClose: () => void
}

export function BagDrawer({
  items,
  totalPrice,
  onUpdateQuantity,
  onRemove,
  onClear,
  onClose,
}: BagDrawerProps) {
  const { t, i18n } = useTranslation()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [hasSent, setHasSent] = useState(false)
  const contacts = useContacts()
  const language = i18n.resolvedLanguage

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) {
      dialog.showModal()
    }
  }, [])

  function close() {
    dialogRef.current?.close()
  }

  function handleClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) {
      close()
    }
  }

  function buildMessage() {
    const lines = items.map((item) => {
      const size = item.size ? ` (${item.size})` : ''
      const price = formatPrice(item.price * item.quantity, language)
      return `• ${item.quantity}x ${item.name}${size} – ${price}`
    })

    return [
      t('shop.bag.message.greeting'),
      '',
      ...lines,
      '',
      t('shop.bag.message.total', {
        total: formatPrice(totalPrice, language),
      }),
    ].join('\n')
  }

  const message = buildMessage()
  const whatsappUrl = contacts?.whatsapp
    ? getWhatsappUrl(contacts.whatsapp, message)
    : undefined

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="bag-title"
      onClose={onClose}
      onClick={handleClick}
      className="my-0 mr-0 ml-auto h-dvh max-h-dvh w-full max-w-md bg-white p-0 text-blue-1 backdrop:bg-blue-1/60"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-gray-2 px-6 py-4">
          <h2 id="bag-title" className="text-h3">
            {t('shop.bag.title')}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label={t('shop.bag.close')}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full transition hover:bg-green-3"
          >
            <XIcon size={24} weight="bold" aria-hidden="true" />
          </button>
        </div>

        {items.length === 0 ? (
          <p className="p-6 text-body text-blue-4">{t('shop.bag.empty')}</p>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <ul role="list" className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item.key}
                    className="flex gap-3 rounded-2xl bg-background p-4"
                  >
                    <div className="w-16 shrink-0">
                      <ProductImage product={item} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-strong">{item.name}</p>
                          <p className="text-small text-blue-4">
                            {item.size &&
                              `${t('shop.dialog.size')} ${item.size} · `}
                            {t('shop.bag.each', {
                              price: formatPrice(item.price, language),
                            })}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemove(item.key)}
                          aria-label={t('shop.bag.remove', {
                            name: item.name,
                          })}
                          className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition hover:bg-green-3"
                        >
                          <TrashIcon size={20} aria-hidden="true" />
                        </button>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        <QuantityStepper
                          label={t('shop.bag.quantityOf', { name: item.name })}
                          value={item.quantity}
                          onChange={(quantity) =>
                            onUpdateQuantity(item.key, quantity)
                          }
                        />
                        <p className="text-button">
                          {formatPrice(item.price * item.quantity, language)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={onClear}
                  className="flex cursor-pointer items-center gap-1 text-small font-bold text-blue-4 transition hover:text-orange-2"
                >
                  <TrashIcon size={16} aria-hidden="true" />
                  {t('shop.bag.clear')}
                </button>
              </div>

              <h3 className="mt-6 text-caption font-bold tracking-wider text-blue-4 uppercase">
                {t('shop.bag.preview')}
              </h3>
              <p className="mt-2 rounded-2xl bg-green-3 p-4 text-small whitespace-pre-line">
                {message}
              </p>
            </div>

            <div className="border-t border-gray-2 p-6">
              <div className="flex items-baseline justify-between text-h4">
                <span>{t('shop.bag.total')}</span>
                <span>{formatPrice(totalPrice, language)}</span>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setHasSent(true)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-button text-blue-1 transition hover:brightness-95"
              >
                <WhatsappLogoIcon size={24} aria-hidden="true" />
                {t('shop.bag.send')}
                <span className="sr-only"> {t('newTab')}</span>
              </a>
              {hasSent ? (
                <div
                  role="status"
                  className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-xl bg-orange-3 p-3 text-small"
                >
                  <span>{t('shop.bag.sentQuestion')}</span>
                  <button
                    type="button"
                    onClick={onClear}
                    className="cursor-pointer font-bold underline decoration-orange-1 decoration-2 underline-offset-4 transition hover:text-orange-2"
                  >
                    {t('shop.bag.clear')}
                  </button>
                </div>
              ) : (
                <p className="mt-2 text-center text-caption text-blue-4">
                  {t('shop.bag.note')}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </dialog>
  )
}
