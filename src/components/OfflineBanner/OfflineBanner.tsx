import React from "react"
import { Text, View } from "react-native"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useNetworkState } from "@/hooks/useNetworkState"
import { useLanguage } from "@/i18n"

import { styles } from "./OfflineBanner.styles"

export function OfflineBanner() {
  const { isOffline, hasPendingWrites } = useNetworkState()
  const insets = useSafeAreaInsets()
  const { t } = useLanguage()

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
        {isSyncing ? t("offline.syncing") : t("offline.offline")}
      </Text>
    </View>
  )
}
