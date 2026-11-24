import { useState } from 'react'

import { CategoryFilter, type CategoryFilterValue } from './CategoryFilter'
import { ProductCard } from './ProductCard'
import { ProductDialog } from './ProductDialog'

import type { Product } from '../../types/product'

type ShopCatalogProps = {
  products: Product[]
  onAddToBag: (product: Product, size: string | null, quantity: number) => void
}

export function ShopCatalog({ products, onAddToBag }: ShopCatalogProps) {
  const [selected, setSelected] = useState<CategoryFilterValue>('all')
  const [openProduct, setOpenProduct] = useState<Product | null>(null)

  const visibleProducts =
    selected === 'all'
      ? products
      : products.filter((product) => product.category === selected)

  return (
    <div className="mt-8">
      <CategoryFilter selected={selected} onSelect={setSelected} />

      <ul
        role="list"
        className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8"
      >
        {visibleProducts.map((product) => (
          <li key={product.id}>
            <ProductCard
              product={product}
              onSelect={() => setOpenProduct(product)}
            />
          </li>
        ))}
      </ul>

      {openProduct && (
        <ProductDialog
          product={openProduct}
          onAddToBag={onAddToBag}
          onClose={() => setOpenProduct(null)}
        />
      )}
    </div>
  )
}
