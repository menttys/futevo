import React from "react"
import { Text, View } from "react-native"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useNetworkState } from "@/hooks/useNetworkState"

import { styles } from "./OfflineBanner.styles"

export function OfflineBanner() {
  const { isOffline, hasPendingWrites } = useNetworkState()
  const insets = useSafeAreaInsets()

  if (!isOffline && !hasPendingWrites) return null

  const isSyncing = !isOffline && hasPendingWrites

  return (
    <View
      style={[
        styles.container,
        isSyncing ? styles.syncing : styles.offline,
        { paddingTop: insets.top + 8 },
      ]}
    >
      <Text style={styles.text}>
        {isSyncing ? "Syncing changes…" : "You're offline — changes will sync later."}
      </Text>
    </View>
  )
}
