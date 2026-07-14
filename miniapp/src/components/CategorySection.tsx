import ProductCard from "./ProductCard"
import type { Category, Product } from "../types/menu"

type Props = {
  category: Category
  onAdd: (product: Product) => void
  onRemove: (product: Product) => void
  getQuantity: (productId: number) => number
}

export default function CategorySection({
  category,
  onAdd,
  onRemove,
  getQuantity,
}: Props) {
  return (
    <div className="category">
      <h2>{category.name}</h2>

      {category.products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          quantity={getQuantity(product.id)}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}