import React, { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import type { NewPlayerFormProps } from "./NewPlayerForm.d"
import { styles } from "./NewPlayerForm.styles"

import { useLanguage } from "@/i18n"

export function NewPlayerForm({ onSubmit }: NewPlayerFormProps) {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  const [name, setName] = useState("")

  const canSubmit = name.trim().length > 0

  const handleSubmit = () => {
    if (!canSubmit) return
    onSubmit({ name: name.trim() })
    setName("")
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder={t("players.namePlaceholder")}
        placeholderTextColor={theme.colors.textMuted}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity
        style={styles.submitButton(canSubmit)}
        onPress={handleSubmit}
        disabled={!canSubmit}
        activeOpacity={0.85}
      >
        <Text style={styles.submitLabel(canSubmit)}>{t("players.add")}</Text>
      </TouchableOpacity>
    </View>
  )
}
