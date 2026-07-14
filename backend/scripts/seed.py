from app.db.database import SessionLocal
from app.models import Restaurant, Category, Product


db = SessionLocal()

try:
    if db.query(Restaurant).first():
        print("База уже заполнена.")
        exit()

    restaurant = Restaurant(
        name="Bistro Montclair"
    )

    db.add(restaurant)
    db.flush()

    salads = Category(
        restaurant_id=restaurant.id,
        name="Салаты",
        sort_order=1,
    )

    hot = Category(
        restaurant_id=restaurant.id,
        name="Горячие блюда",
        sort_order=2,
    )

    drinks = Category(
        restaurant_id=restaurant.id,
        name="Напитки",
        sort_order=3,
    )

    db.add_all([salads, hot, drinks])
    db.flush()

    db.add_all([
        Product(
            category_id=salads.id,
            name="Цезарь с курицей",
            description="Курица, салат ромэн, пармезан, соус Цезарь",
            price=590,
            weight="280 г",
            ingredients="Курица, салат, сыр, сухарики",
        ),
        Product(
            category_id=hot.id,
            name="Стейк Рибай",
            description="С картофелем и перечным соусом",
            price=1890,
            weight="350 г",
            ingredients="Говядина, картофель, соус",
        ),
        Product(
            category_id=drinks.id,
            name="Капучино",
            description="Классический кофе",
            price=290,
            weight="250 мл",
            ingredients="Кофе, молоко",
        ),
    ])

    db.commit()
    print("Тестовые данные успешно добавлены.")

except Exception:
    db.rollback()
    raise

finally:
    db.close()