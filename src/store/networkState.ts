import { create } from "zustand"

type NetworkState = {
  isConnected: boolean
  isInternetReachable: boolean | null
  hasPendingWrites: boolean
  setNetworkStatus: (status: { isConnected: boolean; isInternetReachable: boolean | null }) => void
  setHasPendingWrites: (hasPendingWrites: boolean) => void
}

export const useNetworkStore = create<NetworkState>((set) => ({
  isConnected: true,
  isInternetReachable: null,
  hasPendingWrites: false,
  setNetworkStatus: (status) => set(status),
  setHasPendingWrites: (hasPendingWrites) => set({ hasPendingWrites }),
}))
