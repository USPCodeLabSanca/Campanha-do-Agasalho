import { useTranslation } from 'react-i18next'
import { CoffeeIcon, TagIcon, TShirtIcon } from '@phosphor-icons/react'

import type { Product } from '../../types/product'

type ProductImageProps = {
  product: Pick<Product, 'category' | 'image' | 'isSoldOut'>
}

const placeholderIcons = {
  clothes: TShirtIcon,
  mugs: CoffeeIcon,
  accessories: TagIcon,
}

export function ProductImage({ product }: ProductImageProps) {
  const { t } = useTranslation()
  const PlaceholderIcon = placeholderIcons[product.category]

  return (
    <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-green-3">
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
  )
}
