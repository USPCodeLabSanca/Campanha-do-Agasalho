import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HandbagIcon, WarningCircleIcon, XIcon } from '@phosphor-icons/react'

import { Button } from '../Button'
import { ProductImage } from './ProductImage'
import { QuantityStepper } from './QuantityStepper'
import { SizePicker } from './SizePicker'

import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'
import { getTranslatedText } from '../../utils/getTranslatedText'

type ProductDialogProps = {
  product: Product
  onAddToBag: (product: Product, size: string | null, quantity: number) => void
  onClose: () => void
}

export function ProductDialog({
  product,
  onAddToBag,
  onClose,
}: ProductDialogProps) {
  const { t, i18n } = useTranslation()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [size, setSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isMissingSize, setIsMissingSize] = useState(false)

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

  function handleSelectSize(selectedSize: string) {
    setSize(selectedSize)
    setIsMissingSize(false)
  }

  function handleAddToBag() {
    if (product.sizes && !size) {
      setIsMissingSize(true)
      return
    }

    onAddToBag(product, size, quantity)
    close()
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

          <p className="text-body">
            {getTranslatedText(product.description, i18n.resolvedLanguage)}
          </p>

          {product.isSoldOut ? (
            <p className="rounded-xl bg-orange-3 p-4 text-body">
              {t('shop.dialog.soldOutNotice')}
            </p>
          ) : (
            <>
              {product.sizes && (
                <div>
                  <SizePicker
                    sizes={product.sizes}
                    sizeGuide={product.sizeGuide}
                    selected={size}
                    onSelect={handleSelectSize}
                  />
                  {isMissingSize && (
                    <p
                      role="alert"
                      className="mt-2 flex items-center gap-2 text-small font-bold"
                    >
                      <WarningCircleIcon
                        size={20}
                        weight="fill"
                        className="shrink-0 text-orange-2"
                        aria-hidden="true"
                      />
                      {t('shop.dialog.chooseSize')}
                    </p>
                  )}
                </div>
              )}

              <div>
                <p className="text-strong">{t('shop.dialog.quantity')}</p>
                <div className="mt-2">
                  <QuantityStepper
                    label={t('shop.dialog.quantity')}
                    value={quantity}
                    onChange={setQuantity}
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  onClick={handleAddToBag}
                  rightIcon={<HandbagIcon size={20} />}
                >
                  {t('shop.dialog.addToBag')}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </dialog>
  )
}
