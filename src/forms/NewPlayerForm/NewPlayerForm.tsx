import React, { useState } from "react"
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import { AppButton } from "@/components/AppButton"
import { CountryPicker } from "@/components/CountryPicker"
import { useLanguage } from "@/i18n"
import { Camera } from "@/lib/icons"
import { capitalizeName } from "@/utils/capitalizeName"
import { pickPlayerPhoto } from "@/utils/pickPlayerPhoto"

import type { NewPlayerFormProps } from "./NewPlayerForm.d"
import { styles } from "./NewPlayerForm.styles"

// A short sheet: photo, name, country. Add stays disabled until there is a name.
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
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("players.profile.choosePhoto")}
          onPress={handlePickPhoto}
          style={styles.photo}
        >
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photoImage} />
          ) : (
            <>
              <Camera size={20} color={theme.colors.text} />
              <Text style={styles.photoLabel}>{t("players.addPhoto")}</Text>
            </>
          )}
        </Pressable>

        <View>
          <Text style={styles.label}>{t("players.profile.name")}</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(value) => setName(capitalizeName(value))}
            autoCapitalize="words"
            autoFocus
            placeholder={t("players.namePlaceholder")}
            placeholderTextColor={theme.colors.textMuted}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />
        </View>

        <CountryPicker label={t("players.profile.birthCountry")} value={birthCountry} onChange={setBirthCountry} />
        <CountryPicker
          label={t("players.profile.residencyCountry")}
          value={residencyCountry}
          onChange={setResidencyCountry}
        />
      </ScrollView>

      <View style={styles.footer}>
        <AppButton label={t("players.add")} disabled={!canSubmit} onPress={handleSubmit} style={styles.submit} />
      </View>
    </View>
  )
}
