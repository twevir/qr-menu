from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, selectinload

from app.db.dependencies import get_db
from app.models.category import Category

router = APIRouter(prefix="/menu", tags=["Menu"])


@router.get("/")
def get_menu(db: Session = Depends(get_db)):
    categories = (
        db.query(Category)
        .options(selectinload(Category.products))
        .order_by(Category.sort_order)
        .all()
    )

    result = []

    for category in categories:
        result.append(
            {
                "id": category.id,
                "name": category.name,
                "products": [
                    {
                        "id": product.id,
                        "name": product.name,
                        "description": product.description,
                        "price": product.price,
                        "discount_price": product.discount_price,
                        "weight": product.weight,
                        "ingredients": product.ingredients,
                        "image_url": product.image_url,
                    }
                    for product in sorted(
                        category.products,
                        key=lambda p: p.sort_order,
                    )
                    if product.is_active
                ],
            }
        )

    return result