export type OrderType = "delivery" | "pickup"

export type PaymentMethod = "cash" | "qr"

export type OrderForm = {
  customerName: string
  phone: string

  orderType: OrderType

  address: string

  paymentMethod: PaymentMethod

  changeFrom: string

  deliveryTime: string

  comment: string
}