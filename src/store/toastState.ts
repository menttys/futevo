import { create } from "zustand"

type ToastState = {
  message: string | null
  nonce: number
  showToast: (message: string) => void
  hideToast: () => void
}

export const useToastStore = create<ToastState>()((set) => ({
  message: null,
  nonce: 0,
  showToast: (message) => set((s) => ({ message, nonce: s.nonce + 1 })),
  hideToast: () => set({ message: null }),
}))

export const showToast = (message: string) => useToastStore.getState().showToast(message)
