import React from "react"
import { Pressable, Text, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import { ChevronLeft } from "@/lib/icons"

import type { ScreenHeaderProps } from "./ScreenHeader.d"
import { styles } from "./ScreenHeader.styles"

export function ScreenHeader({ title, variant = "back", onBack, backLabel, right, style }: ScreenHeaderProps) {
  const { theme } = useUnistyles()

  if (variant === "large") {
    return (
      <View style={[styles.large, style]}>
        <Text style={styles.largeTitle} accessibilityRole="header">
          {title}
        </Text>
        {right}
      </View>
    )
  }

  return (
    <View style={[styles.back, style]}>
      {onBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={backLabel ?? "Back"}
          onPress={onBack}
          hitSlop={theme.hitSlop.sm}
          style={styles.backButton}
        >
          <ChevronLeft size={20} color={theme.colors.text} />
        </Pressable>
      ) : null}
      <Text style={styles.backTitle} numberOfLines={1} accessibilityRole="header">
        {title}
      </Text>
      {right}
    </View>
  )
}
