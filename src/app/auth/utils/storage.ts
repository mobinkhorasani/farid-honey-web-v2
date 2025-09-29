export const storage = {
  set: (key: string, value: any) => {
    if (typeof window === "undefined") return
    localStorage.setItem(key, JSON.stringify(value))
  },

  get: <T>(key: string): T | null => {
    if (typeof window === "undefined") return null
    const item = localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : null
  },

  remove: (key: string) => {
    if (typeof window === "undefined") return
    localStorage.removeItem(key)
  },

  clear: () => {
    if (typeof window === "undefined") return
    localStorage.clear()
  },
}
