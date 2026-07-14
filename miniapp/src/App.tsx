import { useEffect, useState } from "react"

import "./App.css"

import { getMenu } from "./api/menu"

import CartBar from "./components/CartBar"
import CategorySection from "./components/CategorySection"
import CheckoutModal from "./components/CheckoutModal"

import { useCart } from "./hooks/useCart"

import type { Category } from "./types/menu"

function App() {
  const [menu, setMenu] = useState<Category[]>([])
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const cart = useCart()

  useEffect(() => {
    getMenu()
      .then(setMenu)
      .catch(console.error)
  }, [])

  return (
    <main>
      <h1>Bistro Montclair</h1>

      {menu.map((category) => (
        <CategorySection
          key={category.id}
          category={category}
          onAdd={cart.add}
          onRemove={cart.remove}
          getQuantity={cart.getQuantity}
        />
      ))}

      <CartBar
        count={cart.count}
        total={cart.total}
        onCheckout={() => setCheckoutOpen(true)}
      />

      <CheckoutModal
        open={checkoutOpen}
        total={cart.total}
        items={cart.items}
        onClose={() => setCheckoutOpen(false)}
        onSuccess={cart.clear}
      />
    </main>
  )
}

export default App