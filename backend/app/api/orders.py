from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.telegram import send_new_order

from app.db.dependencies import get_db

from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product

from app.schemas.order import OrderCreate

router = APIRouter(
    prefix="/orders",
    tags=["Orders"],
)


@router.post("/")
def create_order(
    data: OrderCreate,
    db: Session = Depends(get_db),
):
    order = Order(
        customer_name=data.customer_name,
        phone=data.phone,
        order_type=data.order_type,
        address=data.address,
        payment_method=data.payment_method,
        change_from=data.change_from,
        delivery_time=data.delivery_time,
        comment=data.comment,
    )

    db.add(order)
    db.flush()

    total = 0

    for item in data.items:
        product = db.get(Product, item.product_id)

        if product is None:
            continue

        total += product.price * item.quantity

        db.add(
            OrderItem(
                order_id=order.id,
                product_id=product.id,
                quantity=item.quantity,
                price=product.price,
            )
        )

    order.total_amount = total

    db.commit()
    db.refresh(order)
    send_new_order(order)

    return {
        "id": order.id,
        "total": order.total_amount,
        "status": order.status,
    }