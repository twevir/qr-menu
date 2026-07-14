import { useMemo, useState } from "react"

import { createOrder } from "../api/orders"

import type { CartItem } from "../hooks/useCart"
import type { OrderForm } from "../types/order"

import { getDeliverySlots } from "../utils/deliveryTime"

type Props = {
  open: boolean
  total: number
  items: CartItem[]
  onClose: () => void
  onSuccess: () => void
}

const initialForm: OrderForm = {
  customerName: "",
  phone: "",
  orderType: "delivery",
  address: "",
  paymentMethod: "cash",
  changeFrom: "",
  deliveryTime: "",
  comment: "",
}

export default function CheckoutModal({
  open,
  total,
  items,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState<OrderForm>(initialForm)

  const slots = useMemo(() => getDeliverySlots(), [])

  if (!open) return null

  function update<K extends keyof OrderForm>(
    key: K,
    value: OrderForm[K],
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  async function submit() {
    if (!form.customerName.trim()) {
      alert("Введите имя")
      return
    }

    if (!form.phone.trim()) {
      alert("Введите телефон")
      return
    }

    if (
      form.orderType === "delivery" &&
      !form.address.trim()
    ) {
      alert("Введите адрес доставки")
      return
    }

    try {
      await createOrder(form, items)

      alert("Заказ успешно оформлен!")

      setForm(initialForm)

      onSuccess()

      onClose()
    } catch (e) {
      console.error(e)
      alert("Ошибка оформления заказа")
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: 430,
          maxWidth: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#fff",
          borderRadius: 16,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <h2>Оформление заказа</h2>

        <input
          placeholder="Имя"
          value={form.customerName}
          onChange={(e) =>
            update("customerName", e.target.value)
          }
        />

        <input
          placeholder="Телефон"
          value={form.phone}
          onChange={(e) =>
            update("phone", e.target.value)
          }
        />

        <label>
          <input
            type="radio"
            checked={form.orderType === "delivery"}
            onChange={() =>
              update("orderType", "delivery")
            }
          />

          Доставка
        </label>

        <label>
          <input
            type="radio"
            checked={form.orderType === "pickup"}
            onChange={() =>
              update("orderType", "pickup")
            }
          />

          Самовывоз
        </label>

        {form.orderType === "delivery" && (
          <>
            <input
              placeholder="Адрес доставки"
              value={form.address}
              onChange={(e) =>
                update("address", e.target.value)
              }
            />

            <label>
              <input
                type="radio"
                checked={form.paymentMethod === "cash"}
                onChange={() =>
                  update("paymentMethod", "cash")
                }
              />

              Наличные
            </label>

            <label>
              <input
                type="radio"
                checked={form.paymentMethod === "qr"}
                onChange={() =>
                  update("paymentMethod", "qr")
                }
              />

              QR
            </label>

            {form.paymentMethod === "cash" && (
              <input
                placeholder="Сдача с..."
                value={form.changeFrom}
                onChange={(e) =>
                  update("changeFrom", e.target.value)
                }
              />
            )}
          </>
        )}

        <select
          value={form.deliveryTime}
          onChange={(e) =>
            update("deliveryTime", e.target.value)
          }
        >
          <option value="">
            Выберите время доставки
          </option>

          {slots.map((slot) => (
            <option
              key={slot}
              value={slot}
            >
              {slot}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Комментарий"
          value={form.comment}
          onChange={(e) =>
            update("comment", e.target.value)
          }
        />

        <button onClick={submit}>
          Оформить заказ ({total} ₽)
        </button>

        <button onClick={onClose}>
          Отмена
        </button>
      </div>
    </div>
  )
}