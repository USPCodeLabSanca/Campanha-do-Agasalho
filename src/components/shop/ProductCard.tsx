import { useTranslation } from 'react-i18next'
import { CoffeeIcon, TagIcon, TShirtIcon } from '@phosphor-icons/react'

import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'

type ProductCardProps = {
  product: Product
}

const placeholderIcons = {
  clothes: TShirtIcon,
  mugs: CoffeeIcon,
  accessories: TagIcon,
}

export function ProductCard({ product }: ProductCardProps) {
  const { t, i18n } = useTranslation()
  const PlaceholderIcon = placeholderIcons[product.category]

  return (
    <article className="flex h-full flex-col card border-green-1/40 p-3">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-green-3">
        {product.image ? (
          <img
            src={product.image}
            alt=""
            className={`size-full object-cover ${product.isSoldOut ? 'opacity-50' : ''}`}
          />
        ) : (
          <PlaceholderIcon
            aria-hidden="true"
            className={`size-1/2 text-green-1 ${product.isSoldOut ? 'opacity-40' : ''}`}
          />
        )}
        {product.isSoldOut && (
          <span className="absolute top-2 left-2 rounded-full bg-blue-1 px-3 py-0.5 text-caption font-bold text-white">
            {t('shop.products.soldOut')}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 px-1 pt-3 pb-1">
        <p className="text-caption font-bold tracking-wider text-blue-4 uppercase">
          {t(`shop.products.categories.${product.category}`)}
        </p>
        <h3 className="text-strong">{product.name}</h3>
        <p className="mt-auto pt-2 text-button">
          {formatPrice(product.price, i18n.resolvedLanguage)}
        </p>
      </div>
    </article>
  )
}
