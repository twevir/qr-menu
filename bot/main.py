from aiogram import Bot, Dispatcher
from aiogram.filters import CommandStart
from aiogram.types import (
    KeyboardButton,
    Message,
    ReplyKeyboardMarkup,
    WebAppInfo,
)
from aiogram import F

BOT_TOKEN = "8688957517:AAHA5JC7mkBKQt8ZesEPZWQmwktZW1p0ZcE"

MINI_APP_URL = "https://montclair-mu.vercel.app"

bot = Bot(BOT_TOKEN)
dp = Dispatcher()


@dp.message(CommandStart())
async def start(message: Message):
    keyboard = ReplyKeyboardMarkup(
        keyboard=[
            [
                KeyboardButton(
                    text="🍽 Открыть меню",
                    web_app=WebAppInfo(url=MINI_APP_URL),
                )
            ]
        ],
        resize_keyboard=True,
    )

    await message.answer(
        "Добро пожаловать в Bistro Montclair!",
        reply_markup=keyboard,
    )


@dp.message(F.web_app_data)
async def webapp_data(message: Message):
    print(message.web_app_data.data)


if __name__ == "__main__":
    dp.run_polling(bot)