import React from "react"
import { Text, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import { AppButton } from "@/components/AppButton"
import { FutevoMark } from "@/components/FutevoMark"

import type { EmptyStateProps } from "./EmptyState.d"
import { styles } from "./EmptyState.styles"

// Empty states point to the next action: the mark in a yellow disc, a title and one button.
export function EmptyState({ title, subtitle, actionLabel, onAction, style }: EmptyStateProps) {
  const { theme } = useUnistyles()

  return (
    <View style={[styles.container, style]}>
      <View style={styles.disc}>
        <FutevoMark size={42} rotate={12} color={theme.colors.dark} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {actionLabel && onAction ? (
        <AppButton label={actionLabel} labelStyle="body" onPress={onAction} style={styles.action} />
      ) : null}
    </View>
  )
}
