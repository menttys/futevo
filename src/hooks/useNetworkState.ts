import { useEffect } from "react"

import NetInfo from "@react-native-community/netinfo"

import { useNetworkStore } from "@/store/networkState"

export const useNetworkState = () => {
  const isConnected = useNetworkStore((s) => s.isConnected)
  const hasPendingWrites = useNetworkStore((s) => s.hasPendingWrites)
  const setNetworkStatus = useNetworkStore((s) => s.setNetworkStatus)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkStatus({
        isConnected: !!state.isConnected,
        isInternetReachable: state.isInternetReachable,
      })
    })
    return unsubscribe
  }, [setNetworkStatus])

  return { isOffline: !isConnected, hasPendingWrites }
}
