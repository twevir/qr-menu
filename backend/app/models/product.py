from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True)

    category_id: Mapped[int] = mapped_column(
        ForeignKey("categories.id"),
        nullable=False,
    )

    name: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(default="")

    price: Mapped[int] = mapped_column(nullable=False)
    discount_price: Mapped[int | None] = mapped_column(nullable=True)

    weight: Mapped[str | None] = mapped_column(nullable=True)
    ingredients: Mapped[str | None] = mapped_column(nullable=True)

    image_url: Mapped[str | None] = mapped_column(nullable=True)

    is_active: Mapped[bool] = mapped_column(default=True)
    sort_order: Mapped[int] = mapped_column(default=0)

    category: Mapped["Category"] = relationship(
        back_populates="products"
    )

    order_items: Mapped[list["OrderItem"]] = relationship()