import React, { useState } from "react"
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"

import { useNavigation, useRoute } from "@react-navigation/native"
import type { RouteProp } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { useUnistyles } from "react-native-unistyles"

import { CountryPicker } from "@/components/CountryPicker"
import { PlayerAvatar } from "@/components/PlayerAvatar"
import { usePlayers } from "@/hooks/usePlayers"
import { useTabBarInset } from "@/hooks/useTabBarInset"
import { useLanguage } from "@/i18n"
import { PlayersRoutes } from "@/navigation/routes"
import type { PlayersStackParamList } from "@/navigation/types/navigation"
import { usePlayerStore } from "@/store/playerState"
import { capitalizeName } from "@/utils/capitalizeName"
import { confirmAction } from "@/utils/confirmAction"
import { pickPlayerPhoto } from "@/utils/pickPlayerPhoto"

import { styles } from "./PlayerProfileScreen.styles"

export function PlayerProfileScreen() {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  const tabBarInset = useTabBarInset()
  const navigation = useNavigation<StackNavigationProp<PlayersStackParamList, "PlayerProfile">>()
  const route = useRoute<RouteProp<PlayersStackParamList, "PlayerProfile">>()
  const player = usePlayerStore((s) => s.players?.find((p) => p.id === route.params.playerId))
  const { savePlayer, deletePlayer } = usePlayers()

  const [name, setName] = useState(player?.name ?? "")
  const [photoUri, setPhotoUri] = useState(player?.photoUri ?? "")
  const [birthCountry, setBirthCountry] = useState(player?.birthCountry ?? "")
  const [residencyCountry, setResidencyCountry] = useState(player?.residencyCountry ?? "")

  if (!player) return <View style={styles.root} />

  const canSave = name.trim().length > 0

  const handlePickPhoto = async () => {
    try {
      const uri = await pickPlayerPhoto()
      if (uri) setPhotoUri(uri)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSave = () => {
    if (!canSave) return
    savePlayer({
      id: player.id,
      name: name.trim(),
      photoUri,
      birthCountry,
      residencyCountry,
    })
    navigation.navigate(PlayersRoutes.PLAYERS_HOME)
  }

  const handleDelete = () => {
    confirmAction({
      title: t("players.profile.deleteTitle"),
      message: t("players.profile.deleteMessage"),
      confirmLabel: t("players.profile.delete"),
      onConfirm: () => {
        deletePlayer(player.id)
        navigation.navigate(PlayersRoutes.PLAYERS_HOME)
      },
    })
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={[styles.content, { paddingBottom: tabBarInset + 16 }]}>
      <View style={styles.card}>
        <View style={styles.photoSection}>
          <PlayerAvatar name={name || player.name} photoUri={photoUri || undefined} size={96} />
          <TouchableOpacity onPress={handlePickPhoto}>
            <Text style={styles.linkText}>
              {photoUri ? t("players.profile.changePhoto") : t("players.profile.choosePhoto")}
            </Text>
          </TouchableOpacity>
          {photoUri ? (
            <TouchableOpacity onPress={() => setPhotoUri("")}>
              <Text style={styles.linkText}>{t("players.profile.removePhoto")}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View>
          <Text style={styles.label}>{t("players.profile.name")}</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(value) => setName(capitalizeName(value))}
            autoCapitalize="words"
            placeholder={t("players.namePlaceholder")}
            placeholderTextColor={theme.colors.textMuted}
          />
        </View>
        <CountryPicker
          label={t("players.profile.birthCountry")}
          value={birthCountry}
          onChange={setBirthCountry}
        />
        <CountryPicker
          label={t("players.profile.residencyCountry")}
          value={residencyCountry}
          onChange={setResidencyCountry}
        />
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.saveButton(canSave)}
          onPress={handleSave}
          disabled={!canSave}
          activeOpacity={0.85}
        >
          <Text style={styles.saveLabel(canSave)}>{t("players.profile.save")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete} activeOpacity={0.85}>
          <Text style={styles.deleteLabel}>{t("players.profile.delete")}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
