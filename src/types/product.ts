export type ProductCategory = 'clothes' | 'mugs' | 'accessories'

export type Product = {
  id: string
  name: string
  category: ProductCategory
  price: number
  description: string
  image?: string
  sizes?: string[]
  isSoldOut?: boolean
}
