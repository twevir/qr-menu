import type { Category } from "../types/menu"

const API_URL = "https://initially-diameter-fired-response.trycloudflare.com"

export async function getMenu(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/menu/`)

  if (!response.ok) {
    throw new Error("Не удалось загрузить меню")
  }

  return response.json()
}