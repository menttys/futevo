import React, { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import type { NewPlayerFormProps } from "./NewPlayerForm.d"
import { styles } from "./NewPlayerForm.styles"

export function NewPlayerForm({ onSubmit }: NewPlayerFormProps) {
  const { theme } = useUnistyles()
  const palette = theme.colors.playerPalette
  const [name, setName] = useState("")
  const [color, setColor] = useState(palette[0])

  const canSubmit = name.trim().length > 0

  const handleSubmit = () => {
    if (!canSubmit) return
    onSubmit({ name: name.trim(), color })
    setName("")
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Player name"
        placeholderTextColor={theme.colors.textMuted}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />
      <View style={styles.swatchRow}>
        {palette.map((swatch) => (
          <TouchableOpacity
            key={swatch}
            style={styles.swatch(swatch, swatch === color)}
            onPress={() => setColor(swatch)}
          />
        ))}
      </View>
      <TouchableOpacity
        style={styles.submitButton(canSubmit)}
        onPress={handleSubmit}
        disabled={!canSubmit}
        activeOpacity={0.85}
      >
        <Text style={styles.submitLabel(canSubmit)}>Add player</Text>
      </TouchableOpacity>
    </View>
  )
}
