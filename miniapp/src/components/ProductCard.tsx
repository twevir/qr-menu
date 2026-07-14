import type { Product } from "../types/menu"

type Props = {
  product: Product
  quantity: number
  onAdd: (product: Product) => void
  onRemove: (product: Product) => void
}

export default function ProductCard({
  product,
  quantity,
  onAdd,
  onRemove,
}: Props) {
  return (
    <div className="product">
      <h3>{product.name}</h3>

      <p className="description">
        {product.description}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <div className="price">
          {product.price} ₽
        </div>

        {quantity === 0 ? (
          <button onClick={() => onAdd(product)}>
            Добавить
          </button>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <button onClick={() => onRemove(product)}>
              −
            </button>

            <strong>{quantity}</strong>

            <button onClick={() => onAdd(product)}>
              +
            </button>
          </div>
        )}
      </div>
    </div>
  )
}