import React, { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import type { NewPlayerFormProps } from "./NewPlayerForm.d"
import { styles } from "./NewPlayerForm.styles"

import { CountryPicker } from "@/components/CountryPicker"
import { PlayerAvatar } from "@/components/PlayerAvatar"
import { useLanguage } from "@/i18n"
import { capitalizeName } from "@/utils/capitalizeName"
import { pickPlayerPhoto } from "@/utils/pickPlayerPhoto"

export function NewPlayerForm({ onSubmit }: NewPlayerFormProps) {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  const [name, setName] = useState("")
  const [photoUri, setPhotoUri] = useState("")
  const [birthCountry, setBirthCountry] = useState("")
  const [residencyCountry, setResidencyCountry] = useState("")

  const canSubmit = name.trim().length > 0

  const handleSubmit = () => {
    if (!canSubmit) return
    onSubmit({
      name: name.trim(),
      photoUri: photoUri || undefined,
      birthCountry: birthCountry || undefined,
      residencyCountry: residencyCountry || undefined,
    })
    setName("")
    setPhotoUri("")
    setBirthCountry("")
    setResidencyCountry("")
  }

  const handlePickPhoto = async () => {
    try {
      const uri = await pickPlayerPhoto()
      if (uri) setPhotoUri(uri)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePickPhoto} activeOpacity={0.85}>
        <PlayerAvatar name={name || "?"} photoUri={photoUri || undefined} size={48} />
      </TouchableOpacity>
      <View style={styles.nameField}>
        <TextInput
          style={[styles.input, !name && styles.inputEmpty]}
          value={name}
          onChangeText={(value) => setName(capitalizeName(value))}
          autoCapitalize="words"
          placeholder={t("players.namePlaceholder")}
          placeholderTextColor={theme.colors.grey300}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      </View>
      <View style={styles.countryField}>
        <CountryPicker
          label={t("players.profile.birthCountry")}
          value={birthCountry}
          onChange={setBirthCountry}
        />
      </View>
      <View style={styles.countryField}>
        <CountryPicker
          label={t("players.profile.residencyCountry")}
          value={residencyCountry}
          onChange={setResidencyCountry}
        />
      </View>
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
