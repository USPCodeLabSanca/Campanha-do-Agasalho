import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ShopCatalog } from './ShopCatalog'

import { getProducts } from '../../services/shop'
import type { Product } from '../../types/product'

type ShopProductsProps = {
  onAddToBag: (product: Product, size: string | null, quantity: number) => void
}

export function ShopProducts({ onAddToBag }: ShopProductsProps) {
  const { t } = useTranslation()
  const [products, setProducts] = useState<Product[] | null>(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data)
      })
      .catch(() => {
        setHasError(true)
      })
  }, [])

  function getStatusMessage() {
    if (hasError) return t('shop.products.error')
    if (products === null) return t('shop.products.loading')
    if (products.length === 0) return t('shop.products.empty')
    return null
  }

  const statusMessage = getStatusMessage()

  return (
    <section aria-labelledby="shop-products-title" className="section-spacing">
      <div className="page-container">
        <h2 id="shop-products-title" className="text-h2">
          {t('shop.products.title')}
        </h2>
        <p className="mt-2 max-w-3xl text-body">
          {t('shop.products.subtitle')}
        </p>

        {statusMessage || !products ? (
          <p role="status" className="mt-8 text-body text-blue-4">
            {statusMessage}
          </p>
        ) : (
          <ShopCatalog products={products} onAddToBag={onAddToBag} />
        )}
      </div>
    </section>
  )
}
