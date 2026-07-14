export function getDeliverySlots(): string[] {
  const slots: string[] = []

  const now = new Date()

  const open = new Date(now)
  open.setHours(9, 0, 0, 0)

  const close = new Date(now)
  close.setHours(22, 30, 0, 0)

  const isOpen = now >= open && now <= close

  let current: Date
  let end: Date
  let prefix: string

  if (isOpen) {
    slots.push("Как можно скорее")

    current = new Date(now)

    if (current.getMinutes() < 30) {
      current.setMinutes(30, 0, 0)
    } else {
      current.setHours(current.getHours() + 1, 0, 0, 0)
    }

    end = new Date(now)
    end.setHours(22, 30, 0, 0)

    prefix = "Сегодня"
  } else {
    current = new Date(now)
    current.setDate(current.getDate() + 1)
    current.setHours(9, 30, 0, 0)

    end = new Date(current)
    end.setHours(22, 30, 0, 0)

    prefix = "Завтра"
  }

  while (current <= end) {
    slots.push(
      `${prefix}, ${current.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      })}`
    )

    current = new Date(current.getTime() + 30 * 60 * 1000)
  }

  return slots
}