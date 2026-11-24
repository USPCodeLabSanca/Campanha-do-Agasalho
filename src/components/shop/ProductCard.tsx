import { useTranslation } from 'react-i18next'

import { ProductImage } from './ProductImage'

import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'

type ProductCardProps = {
  product: Product
  onSelect: () => void
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const { t, i18n } = useTranslation()

  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex h-full w-full cursor-pointer flex-col card border-green-1/40 p-3 text-left transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <ProductImage product={product} />

      <span className="flex flex-1 flex-col gap-1 px-1 pt-3 pb-1">
        <span className="text-caption font-bold tracking-wider text-blue-4 uppercase">
          {t(`shop.products.categories.${product.category}`)}
        </span>
        <span className="text-strong">{product.name}</span>
        <span className="mt-auto pt-2 text-button">
          {formatPrice(product.price, i18n.resolvedLanguage)}
        </span>
      </span>
    </button>
  )
}
