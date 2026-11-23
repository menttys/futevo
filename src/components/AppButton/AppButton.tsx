import React from "react"
import { Pressable, Text } from "react-native"

import type { AppButtonProps } from "./AppButton.d"
import { styles } from "./AppButton.styles"

export function AppButton({
  label,
  onPress,
  variant = "primary",
  labelStyle = "display",
  icon,
  iconRight,
  disabled = false,
  style,
  accessibilityLabel,
}: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button(variant, disabled, pressed), style]}
    >
      {icon}
      <Text style={styles.label(variant, labelStyle === "display")}>{label}</Text>
      {iconRight}
    </Pressable>
  )
}
