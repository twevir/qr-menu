from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Restaurant(Base):
    __tablename__ = "restaurants"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)

    categories: Mapped[list["Category"]] = relationship(
        back_populates="restaurant",
        cascade="all, delete-orphan",
    )