import React, { useMemo, useState } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useUnistyles } from "react-native-unistyles"

import { AppButton } from "@/components/AppButton"
import { EmptyState } from "@/components/EmptyState"
import { PlayerTile } from "@/components/PlayerTile"
import { SearchField } from "@/components/SearchField"
import { useLanguage } from "@/i18n"
import { X } from "@/lib/icons"
import { MatchesStackParamList } from "@/navigation/types"
import { useNewMatchStore } from "@/store/newMatchState"
import { usePlayerStore } from "@/store/playerState"

import { styles } from "./PlayerPickerScreen.styles"

type NavigationProp = StackNavigationProp<MatchesStackParamList, "PlayerPicker">
type PlayerPickerRouteProp = RouteProp<MatchesStackParamList, "PlayerPicker">

// Picks the player for one court slot. A sheet over the New match form; Done writes
// the choice into the draft store and closes.
export function PlayerPickerScreen() {
  const { t } = useLanguage()
  const { theme } = useUnistyles()
  const navigation = useNavigation<NavigationProp>()
  const { side, index } = useRoute<PlayerPickerRouteProp>().params
  const storedPlayers = usePlayerStore((s) => s.players)
  const teamA = useNewMatchStore((s) => s.teamA)
  const teamB = useNewMatchStore((s) => s.teamB)
  const setSlot = useNewMatchStore((s) => s.setSlot)

  const [query, setQuery] = useState("")
  const [draftId, setDraftId] = useState<string | undefined>(
    () => (side === "A" ? teamA : teamB)[index]
  )

  const isHome = side === "A"
  const teamLabel = isHome ? t("newMatch.home") : t("newMatch.away")
  const slotLabel = index === 0 ? t("newMatch.left") : t("newMatch.right")

  // A player already in another slot can't be picked here; this slot's own player can.
  const available = useMemo(() => {
    const taken = [
      ...teamA.map((id, i) => (side === "A" && i === index ? undefined : id)),
      ...teamB.map((id, i) => (side === "B" && i === index ? undefined : id)),
    ]
    const q = query.trim().toLowerCase()
    return (storedPlayers ?? [])
      .filter((p) => !taken.includes(p.id))
      .filter((p) => !q || p.name.toLowerCase().includes(q))
  }, [storedPlayers, query, teamA, teamB, side, index])

  const toggle = (playerId: string) =>
    setDraftId((current) => (current === playerId ? undefined : playerId))

  const close = () => navigation.goBack()

  const done = () => {
    setSlot(side, index, draftId)
    close()
  }

  return (
    <View style={styles.root}>
      <Pressable
        style={styles.dismissArea}
        onPress={close}
        accessibilityRole="button"
        accessibilityLabel={t("common.close")}
      />
      <View style={styles.sheet}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {t("newMatch.selectSidePlayer", { team: teamLabel, side: slotLabel })}
          </Text>
          <View style={styles.headerRight}>
            <Text style={styles.counter}>{draftId ? 1 : 0}/1</Text>
            <Pressable
              style={styles.closeButton}
              onPress={close}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={t("common.close")}
            >
              <X size={18} color={theme.colors.text} />
            </Pressable>
          </View>
        </View>
        <SearchField
          value={query}
          onChangeText={setQuery}
          placeholder={t("players.searchPlaceholder")}
          clearLabel={t("common.clear")}
        />
        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.grid}
          keyboardShouldPersistTaps="handled"
        >
          {available.length === 0 ? (
            <EmptyState title={t("players.noResults")} />
          ) : (
            available.map((player) => (
              <View key={player.id} style={styles.cell}>
                <PlayerTile
                  player={player}
                  selected={player.id === draftId}
                  onPress={() => toggle(player.id)}
                />
              </View>
            ))
          )}
        </ScrollView>
        <AppButton label={t("newMatch.done")} onPress={done} />
      </View>
    </View>
  )
}
