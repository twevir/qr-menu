import type { CartItem } from "../hooks/useCart"
import type { OrderForm } from "../types/order"

const API_URL = "https://qr-menu-hyrt.onrender.com"

export async function createOrder(
  form: OrderForm,
  items: CartItem[],
) {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer_name: form.customerName,
      phone: form.phone,
      order_type: form.orderType,
      address: form.address,
      payment_method: form.paymentMethod,
      change_from: form.changeFrom,
      delivery_time: form.deliveryTime,
      comment: form.comment,
      items: items.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
    }),
  })

  if (!response.ok) {
    throw new Error("Не удалось оформить заказ")
  }

  return await response.json()
}