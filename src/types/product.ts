import type { TranslatedText } from './translatedText'

export type ProductCategory = 'clothes' | 'mugs' | 'accessories'

export type SizeMeasurement = {
  size: string
  width: number
  length: number
}

export type Product = {
  id: string
  name: string
  category: ProductCategory
  price: number
  description: TranslatedText
  image?: string
  sizes?: string[]
  sizeGuide?: SizeMeasurement[]
  isSoldOut?: boolean
}

export type ProductInput = Omit<Product, 'id'>
