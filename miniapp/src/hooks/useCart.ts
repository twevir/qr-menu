import { useMemo, useState } from "react"

import type { Product } from "../types/menu"

export type CartItem = {
  product: Product
  quantity: number
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])

  function add(product: Product) {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id,
      )

      if (!existing) {
        return [
          ...prev,
          {
            product,
            quantity: 1,
          },
        ]
      }

      return prev.map((item) =>
        item.product.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      )
    })
  }

  function remove(product: Product) {
    setItems((prev) =>
      prev
        .map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function getQuantity(productId: number) {
    return (
      items.find(
        (item) => item.product.id === productId,
      )?.quantity ?? 0
    )
  }

  function clear() {
    setItems([])
  }

  const total = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum +
          item.product.price * item.quantity,
        0,
      ),
    [items],
  )

  const count = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      ),
    [items],
  )

  return {
    items,
    add,
    remove,
    getQuantity,
    total,
    count,
    clear,
  }
}