from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.menu import router as menu_router
from app.api.orders import router as orders_router

app = FastAPI(title="QR Menu API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


app.include_router(menu_router)
app.include_router(orders_router)