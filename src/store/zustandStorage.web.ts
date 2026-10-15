import type { StateStorage } from "zustand/middleware"

// localStorage is synchronous like MMKV, so rehydration behaves the same on web.
// Wrapped in try/catch because it can throw in private windows or when blocked.
export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    try {
      window.localStorage.setItem(name, value)
    } catch (error) {
      console.error(error)
    }
  },
  getItem: (name) => {
    try {
      return window.localStorage.getItem(name)
    } catch {
      return null
    }
  },
  removeItem: (name) => {
    try {
      window.localStorage.removeItem(name)
    } catch (error) {
      console.error(error)
    }
  },
}
