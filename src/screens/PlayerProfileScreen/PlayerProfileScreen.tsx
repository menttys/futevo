import React, { useMemo, useState } from "react"
import { Pressable, ScrollView, Text, TextInput, View } from "react-native"

import { useNavigation, useRoute } from "@react-navigation/native"
import type { RouteProp } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { useUnistyles } from "react-native-unistyles"

import { AppButton } from "@/components/AppButton"
import { CountryPicker } from "@/components/CountryPicker"
import { FutevoMark } from "@/components/FutevoMark"
import { MeshBackground } from "@/components/MeshBackground"
import { PlayerAvatar } from "@/components/PlayerAvatar"
import { ResultBadge } from "@/components/ResultBadge"
import { ScreenHeader } from "@/components/ScreenHeader"
import { StatTile } from "@/components/StatTile"
import { usePlayers } from "@/hooks/usePlayers"
import { useTabBarInset } from "@/hooks/useTabBarInset"
import { useLanguage } from "@/i18n"
import { Camera, Trash2 } from "@/lib/icons"
import { PlayersRoutes } from "@/navigation/routes"
import type { PlayersStackParamList } from "@/navigation/types/navigation"
import { useMatchStore } from "@/store/matchState"
import { usePlayerStore } from "@/store/playerState"
import { capitalizeName } from "@/utils/capitalizeName"
import { confirmAction } from "@/utils/confirmAction"
import { firstName } from "@/utils/matchLabels"
import { pickPlayerPhoto } from "@/utils/pickPlayerPhoto"
import { computePlayerRecord } from "@/utils/playerStats"

import { styles } from "./PlayerProfileScreen.styles"

// Edit and understand one player in the same place.
export function PlayerProfileScreen() {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  const tabBarInset = useTabBarInset()
  const navigation = useNavigation<StackNavigationProp<PlayersStackParamList, "PlayerProfile">>()
  const route = useRoute<RouteProp<PlayersStackParamList, "PlayerProfile">>()
  const players = usePlayerStore((s) => s.players)
  const player = players?.find((p) => p.id === route.params.playerId)
  const matches = useMatchStore((s) => s.matches)
  const { savePlayer, deletePlayer } = usePlayers()

  const [name, setName] = useState(player?.name ?? "")
  const [photoUri, setPhotoUri] = useState(player?.photoUri ?? "")
  const [birthCountry, setBirthCountry] = useState(player?.birthCountry ?? "")
  const [residencyCountry, setResidencyCountry] = useState(player?.residencyCountry ?? "")

  const record = useMemo(
    () => (player ? computePlayerRecord(player.id, matches ?? []) : undefined),
    [player, matches]
  )

  if (!player || !record) return <View style={styles.root} />

  const canSave = name.trim().length > 0
  const partner = record.bestPartnerId ? players?.find((p) => p.id === record.bestPartnerId) : undefined
  const winRate = record.played > 0 ? `${Math.round((record.wins / record.played) * 100)}%` : "–"

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
    <View style={styles.root}>
      <MeshBackground />
      <ScreenHeader
        title={t("screens.player")}
        onBack={() => navigation.goBack()}
        backLabel={t("common.back")}
        right={
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: !canSave }}
            disabled={!canSave}
            onPress={handleSave}
            style={styles.savePill(canSave)}
          >
            <Text style={styles.saveLabel}>{t("players.profile.save")}</Text>
          </Pressable>
        }
      />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: tabBarInset + 16 }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.hero}>
          <FutevoMark size={230} rotate={10} color={theme.colors.washStrong} style={styles.heroMark} />
          <View>
            <PlayerAvatar name={name || player.name} photoUri={photoUri || undefined} size={112} tone="yellow" />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={photoUri ? t("players.profile.changePhoto") : t("players.profile.choosePhoto")}
              onPress={handlePickPhoto}
              style={styles.cameraBadge}
            >
              <Camera size={16} color={theme.colors.text} />
            </Pressable>
          </View>
          {photoUri ? (
            <Pressable accessibilityRole="button" onPress={() => setPhotoUri("")}>
              <Text style={styles.link}>{t("players.profile.removePhoto")}</Text>
            </Pressable>
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

        <View style={styles.countries}>
          <View style={styles.country}>
            <CountryPicker label={t("players.profile.birthCountry")} value={birthCountry} onChange={setBirthCountry} />
          </View>
          <View style={styles.country}>
            <CountryPicker
              label={t("players.profile.residencyCountry")}
              value={residencyCountry}
              onChange={setResidencyCountry}
            />
          </View>
        </View>

        <View style={styles.stats}>
          <StatTile value={String(record.played)} label={t("players.profile.matches")} />
          <StatTile value={winRate} label={t("players.profile.winRate")} />
          <StatTile value={partner ? firstName(partner.name) : "–"} label={t("players.profile.bestPartner")} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>{t("players.profile.lastFive")}</Text>
          {record.lastResults.length > 0 ? (
            <View style={styles.form}>
              {record.lastResults.map((won, index) => (
                <ResultBadge
                  key={index}
                  size={26}
                  result={won ? "win" : "loss"}
                  label={won ? t("common.win") : t("common.loss")}
                />
              ))}
            </View>
          ) : (
            <Text style={styles.empty}>{t("players.noMatches")}</Text>
          )}
        </View>

        <AppButton
          label={t("players.profile.delete")}
          variant="danger"
          labelStyle="body"
          onPress={handleDelete}
          icon={<Trash2 size={18} color={theme.colors.danger} />}
        />
      </ScrollView>
    </View>
  )
}
