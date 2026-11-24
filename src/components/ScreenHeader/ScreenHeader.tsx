import React from "react"
import { Pressable, Text, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import { useSideTabBar } from "@/hooks/useSideTabBar"
import { ChevronLeft } from "@/lib/icons"

import type { ScreenHeaderProps } from "./ScreenHeader.d"
import { styles } from "./ScreenHeader.styles"

export function ScreenHeader({
  title,
  variant = "back",
  onBack,
  backLabel,
  right,
  style,
}: ScreenHeaderProps) {
  const { theme } = useUnistyles()
  // Desktop web: bigger titles, and the back header sits in the centred content column.
  const wide = useSideTabBar()

  if (variant === "large") {
    return (
      <View style={[styles.large, wide && styles.largeWide, style]}>
        <Text style={[styles.largeTitle, wide && styles.largeTitleWide]} accessibilityRole="header">
          {title}
        </Text>
        {right}
      </View>
    )
  }

  return (
    <View style={[styles.back, wide && styles.backWide, style]}>
      {onBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={backLabel ?? "Back"}
          onPress={onBack}
          hitSlop={theme.hitSlop.sm}
          style={[styles.backButton, wide && styles.backButtonWide]}
        >
          <ChevronLeft size={20} color={theme.colors.text} />
        </Pressable>
      ) : null}
      <Text
        style={[styles.backTitle, wide && styles.backTitleWide]}
        numberOfLines={1}
        accessibilityRole="header"
      >
        {title}
      </Text>
      {right}
    </View>
  )
}
