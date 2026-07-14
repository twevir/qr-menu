type Props = {
  count: number
  total: number
  onCheckout: () => void
}

export default function CartBar({
  count,
  total,
  onCheckout,
}: Props) {
  if (count === 0) return null

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        maxWidth: 700,
        background: "#222",
        color: "white",
        padding: 16,
        borderRadius: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <span>{count} товаров</span>

        <strong>{total} ₽</strong>
      </div>

      <button
        onClick={onCheckout}
        style={{
          width: "100%",
          padding: 12,
          cursor: "pointer",
        }}
      >
        Оформить заказ
      </button>
    </div>
  )
}