import React from "react"
import { Text, View } from "react-native"

import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useUnistyles } from "react-native-unistyles"

import { useNetworkState } from "@/hooks/useNetworkState"
import { useLanguage } from "@/i18n"
import { WifiSlash } from "@/lib/icons"

import { styles } from "./OfflineBanner.styles"

// Reassures that points are saved locally; brand yellow with blue-black text.
export function OfflineBanner() {
  const { isOffline, hasPendingWrites } = useNetworkState()
  const insets = useSafeAreaInsets()
  const { theme } = useUnistyles()
  const { t } = useLanguage()

  if (!isOffline && !hasPendingWrites) return null

  const isSyncing = !isOffline && hasPendingWrites

  return (
    <View pointerEvents="none" style={[styles.container, { paddingTop: insets.top + 6 }]}>
      <View style={styles.banner} accessibilityRole="alert">
        {isSyncing ? null : <WifiSlash size={18} color={theme.colors.text} />}
        <Text style={styles.text}>{isSyncing ? t("offline.syncing") : t("offline.offline")}</Text>
      </View>
    </View>
  )
}
