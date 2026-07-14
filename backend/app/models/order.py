from datetime import datetime
from enum import Enum

from sqlalchemy import Enum as SqlEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class OrderStatus(str, Enum):
    NEW = "NEW"
    ACCEPTED = "ACCEPTED"
    COOKING = "COOKING"
    READY = "READY"
    DELIVERING = "DELIVERING"
    DONE = "DONE"
    CANCELLED = "CANCELLED"


class OrderType(str, Enum):
    DELIVERY = "delivery"
    PICKUP = "pickup"


class PaymentMethod(str, Enum):
    CASH = "cash"
    QR = "qr"


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True)

    customer_name: Mapped[str] = mapped_column(nullable=False)

    phone: Mapped[str] = mapped_column(nullable=False)

    order_type: Mapped[OrderType] = mapped_column(
        SqlEnum(OrderType),
        nullable=False,
    )

    address: Mapped[str | None] = mapped_column(nullable=True)

    payment_method: Mapped[PaymentMethod | None] = mapped_column(
        SqlEnum(PaymentMethod),
        nullable=True,
    )

    change_from: Mapped[str | None] = mapped_column(nullable=True)

    delivery_time: Mapped[str] = mapped_column(nullable=False)

    comment: Mapped[str | None] = mapped_column(nullable=True)

    status: Mapped[OrderStatus] = mapped_column(
        SqlEnum(OrderStatus),
        default=OrderStatus.NEW,
        nullable=False,
    )

    total_amount: Mapped[int] = mapped_column(default=0)

    created_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow,
        nullable=False,
    )

    items: Mapped[list["OrderItem"]] = relationship(
        back_populates="order",
        cascade="all, delete-orphan",
    )