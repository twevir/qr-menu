from pydantic import BaseModel

from app.models.order import OrderType, PaymentMethod


class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int


class OrderCreate(BaseModel):
    customer_name: str
    phone: str

    order_type: OrderType

    address: str | None = None

    payment_method: PaymentMethod | None = None

    change_from: str | None = None

    delivery_time: str

    comment: str | None = None

    items: list[OrderItemCreate]