import React, { useEffect } from "react"
import { Text, View } from "react-native"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useToastStore } from "@/store/toastState"

import { styles } from "./Toast.styles"

const TOAST_DURATION_MS = 2500

export function Toast() {
  const message = useToastStore((s) => s.message)
  const nonce = useToastStore((s) => s.nonce)
  const hideToast = useToastStore((s) => s.hideToast)
  const insets = useSafeAreaInsets()

  useEffect(() => {
    if (!message) return
    const timer = setTimeout(hideToast, TOAST_DURATION_MS)
    return () => clearTimeout(timer)
  }, [message, nonce, hideToast])

  if (!message) return null

  return (
    <View style={styles.wrapper} pointerEvents="none">
      <View style={[styles.toast, { marginTop: insets.top + 8 }]}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  )
}
