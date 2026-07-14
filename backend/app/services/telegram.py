import requests

BOT_TOKEN = "8688957517:AAHA5JC7mkBKQt8ZesEPZWQmwktZW1p0ZcE"
CHAT_ID = 1897895853


def send_new_order(order):
    text = (
        f"🆕 Новый заказ №{order.id}\n\n"
        f"👤 {order.customer_name}\n"
        f"📞 {order.phone}\n"
        f"💰 {order.total_amount} ₽"
    )

    keyboard = {
        "inline_keyboard": [
            [
                {
                    "text": "✅ Принять",
                    "callback_data": f"accept:{order.id}",
                }
            ],
            [
                {
                    "text": "👨‍🍳 Готовится",
                    "callback_data": f"cooking:{order.id}",
                }
            ],
            [
                {
                    "text": "🍽 Готов",
                    "callback_data": f"ready:{order.id}",
                }
            ],
            [
                {
                    "text": "🛵 Передан курьеру",
                    "callback_data": f"delivering:{order.id}",
                }
            ],
            [
                {
                    "text": "✔ Завершен",
                    "callback_data": f"done:{order.id}",
                }
            ],
        ]
    }

    requests.post(
        f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
        json={
            "chat_id": CHAT_ID,
            "text": text,
            "reply_markup": keyboard,
        },
        timeout=10,
    )