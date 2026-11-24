import type { ProductCategory } from './product'

export type BagItem = {
  key: string
  productId: string
  name: string
  category: ProductCategory
  image?: string
  price: number
  size: string | null
  quantity: number
}
