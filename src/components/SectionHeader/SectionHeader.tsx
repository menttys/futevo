import React from "react"
import { Pressable, Text, View } from "react-native"

import type { SectionHeaderProps, SectionLabelProps } from "./SectionHeader.d"
import { styles } from "./SectionHeader.styles"

export function SectionHeader({ title, actionLabel, onAction, style }: SectionHeaderProps) {
  return (
    <View style={[styles.row, style]}>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      {actionLabel && onAction ? (
        <Pressable accessibilityRole="button" onPress={onAction} hitSlop={8}>
          <Text style={styles.action}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  )
}

// Small uppercase label used above groups and fields (TODAY, TARGET SCORE …).
export function SectionLabel({ title, style }: SectionLabelProps) {
  return (
    <View style={style}>
      <Text style={styles.label}>{title}</Text>
    </View>
  )
}
