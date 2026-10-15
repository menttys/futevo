import React from "react"
import { Text, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import type { EmptyStateProps } from "./EmptyState.d"
import { styles } from "./EmptyState.styles"

export function EmptyState({ icon: Icon, title, subtitle, style }: EmptyStateProps) {
  const { theme } = useUnistyles()

  return (
    <View style={[styles.container, style]}>
      <Icon size={44} color={theme.colors.grey300} strokeWidth={1.5} />
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  )
}
