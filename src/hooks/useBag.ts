import { useEffect, useState } from 'react'

import { MAX_QUANTITY } from '../constants/shop'
import type { BagItem } from '../types/bag'
import type { Product } from '../types/product'

const STORAGE_KEY = 'lojinha-sacolinha'

function loadBag(): BagItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function useBag() {
  const [items, setItems] = useState<BagItem[]>(loadBag)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Se o navegador bloquear, a sacolinha só não fica salva
    }
  }, [items])

  function addItem(product: Product, size: string | null, quantity: number) {
    const key = `${product.id}-${size ?? 'unico'}`

    setItems((current) => {
      const existing = current.find((item) => item.key === key)

      if (existing) {
        return current.map((item) =>
          item.key === key
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, MAX_QUANTITY),
              }
            : item,
        )
      }

      return [
        ...current,
        {
          key,
          productId: product.id,
          name: product.name,
          category: product.category,
          image: product.image,
          price: product.price,
          size,
          quantity,
        },
      ]
    })
  }

  function updateQuantity(key: string, quantity: number) {
    setItems((current) =>
      current.map((item) => (item.key === key ? { ...item, quantity } : item)),
    )
  }

  function removeItem(key: string) {
    setItems((current) => current.filter((item) => item.key !== key))
  }

  function clearBag() {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  return {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearBag,
    totalItems,
    totalPrice,
  }
}
