import React from "react"
import { Pressable, TextInput, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import { Search, X } from "@/lib/icons"

import type { SearchFieldProps } from "./SearchField.d"
import { styles } from "./SearchField.styles"

export function SearchField({ value, onChangeText, placeholder, clearLabel, style }: SearchFieldProps) {
  const { theme } = useUnistyles()
  return (
    <View style={[styles.field, style]}>
      <Search size={18} color={theme.colors.textMuted} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        accessibilityLabel={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      {value ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={clearLabel ?? "Clear"}
          onPress={() => onChangeText("")}
          hitSlop={theme.hitSlop.sm}
        >
          <X size={18} color={theme.colors.textMuted} />
        </Pressable>
      ) : null}
    </View>
  )
}
