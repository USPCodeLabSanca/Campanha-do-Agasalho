import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MinusIcon, PlusIcon, XIcon } from '@phosphor-icons/react'

import { ProductImage } from './ProductImage'
import { SizePicker } from './SizePicker'

import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'

type ProductDialogProps = {
  product: Product
  onClose: () => void
}

const MAX_QUANTITY = 10

export function ProductDialog({ product, onClose }: ProductDialogProps) {
  const { t, i18n } = useTranslation()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [size, setSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

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

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="product-dialog-title"
      onClose={onClose}
      onClick={handleClick}
      className="m-auto w-[calc(100%-2rem)] max-w-3xl rounded-2xl bg-white p-0 text-blue-1 backdrop:bg-blue-1/60"
    >
      {/* No celular, faixa fixa no topo para o X não sumir ao rolar */}
      <div className="sticky top-0 z-10 flex justify-end bg-white px-3 pt-3 md:absolute md:top-0 md:right-0 md:bg-transparent">
        <button
          type="button"
          onClick={close}
          aria-label={t('shop.dialog.close')}
          className="flex size-10 cursor-pointer items-center justify-center rounded-full transition hover:bg-green-3"
        >
          <XIcon size={24} weight="bold" aria-hidden="true" />
        </button>
      </div>

      <div className="grid gap-6 px-6 pb-6 md:grid-cols-2 md:gap-8 md:p-8">
        <ProductImage product={product} />

        <div className="flex flex-col gap-4">
          <div>
            <p className="text-caption font-bold tracking-wider text-blue-4 uppercase">
              {t(`shop.products.categories.${product.category}`)}
            </p>
            <h2 id="product-dialog-title" className="mt-1 text-h3">
              {product.name}
            </h2>
            <p className="mt-2 text-h4">
              {formatPrice(product.price, i18n.resolvedLanguage)}
            </p>
          </div>

          <p className="text-body">{product.description}</p>

          {product.isSoldOut ? (
            <p className="rounded-xl bg-orange-3 p-4 text-body">
              {t('shop.dialog.soldOutNotice')}
            </p>
          ) : (
            <>
              {product.sizes && (
                <SizePicker
                  sizes={product.sizes}
                  sizeGuide={product.sizeGuide}
                  selected={size}
                  onSelect={setSize}
                />
              )}

              <div>
                <p id="quantity-label" className="text-strong">
                  {t('shop.dialog.quantity')}
                </p>
                <div
                  role="group"
                  aria-labelledby="quantity-label"
                  className="mt-2 inline-flex items-center gap-1 rounded-full border-2 border-blue-1 p-1"
                >
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={quantity === 1}
                    aria-label={t('shop.dialog.decrease')}
                    className="flex size-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-green-3 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <MinusIcon size={16} aria-hidden="true" />
                  </button>
                  <output
                    aria-live="polite"
                    className="min-w-8 text-center text-button"
                  >
                    {quantity}
                  </output>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity === MAX_QUANTITY}
                    aria-label={t('shop.dialog.increase')}
                    className="flex size-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-green-3 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <PlusIcon size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </dialog>
  )
}
