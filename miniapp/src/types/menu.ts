export type Product = {
  id: number
  name: string
  description: string
  price: number
  discount_price: number | null
  weight: string |null
  ingredients: string | null
  image_url: string | null
}

export type Category = {
  id: number
  name: string
  products: Product[]
}