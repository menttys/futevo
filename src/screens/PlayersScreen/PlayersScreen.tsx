import React, { useCallback, useMemo, useState } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"

import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { FlashList } from "@shopify/flash-list"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useUnistyles } from "react-native-unistyles"

import type { Match, Player } from "@/@types/futevo"
import { Chip } from "@/components/Chip"
import { EmptyState } from "@/components/EmptyState"
import { MeshBackground } from "@/components/MeshBackground"
import { PlayerRow } from "@/components/PlayerRow"
import { ScreenHeader } from "@/components/ScreenHeader"
import { SearchField } from "@/components/SearchField"
import { SectionLabel } from "@/components/SectionHeader"
import { useTabBarInset } from "@/hooks/useTabBarInset"
import { useLanguage } from "@/i18n"
import { Plus } from "@/lib/icons"
import { PlayersRoutes } from "@/navigation/routes"
import type { PlayersStackParamList } from "@/navigation/types/navigation"
import { useMatchStore } from "@/store/matchState"
import { usePlayerStore } from "@/store/playerState"
import { computePlayerRecord } from "@/utils/playerStats"

import { styles } from "./PlayersScreen.styles"

type Row = { type: "letter"; key: string; letter: string } | { type: "player"; key: string; player: Player }

const EMPTY_MATCHES: Match[] = []

function playerCountries(player: Player): string[] {
  return Array.from(new Set([player.residencyCountry, player.birthCountry].filter((c): c is string => !!c)))
}

// Fast to scan, fast to add: search at the very top, A–Z sections, yellow floating +.
export function PlayersScreen() {
  const { t, currentLanguage } = useLanguage()
  const tabBarInset = useTabBarInset()
  const { theme } = useUnistyles()
  const insets = useSafeAreaInsets()
  const storedPlayers = usePlayerStore((s) => s.players)
  const players = useMemo(() => storedPlayers ?? [], [storedPlayers])
  const matches = useMatchStore((s) => s.matches) ?? EMPTY_MATCHES
  const navigation = useNavigation<StackNavigationProp<PlayersStackParamList, "PlayersHome">>()
  const [query, setQuery] = useState("")
  const [country, setCountry] = useState("")

  const countries = useMemo(() => {
    const codes = new Set<string>()
    players.forEach((p) => playerCountries(p).forEach((c) => codes.add(c)))
    return Array.from(codes).sort()
  }, [players])

  const rows = useMemo<Row[]>(() => {
    const q = query.trim().toLowerCase()
    const list = players
      .filter((p) => (!q || p.name.toLowerCase().includes(q)) && (!country || playerCountries(p).includes(country)))
      .sort((a, b) => a.name.localeCompare(b.name, currentLanguage))
    const out: Row[] = []
    let last = ""
    for (const player of list) {
      const letter = (player.name.trim()[0] ?? "#").toLocaleUpperCase(currentLanguage)
      if (letter !== last) {
        last = letter
        out.push({ type: "letter", key: `letter-${letter}`, letter })
      }
      out.push({ type: "player", key: player.id, player })
    }
    return out
  }, [players, query, country, currentLanguage])

  const renderItem = useCallback(
    ({ item, index }: { item: Row; index: number }) => {
      if (item.type === "letter") return <SectionLabel title={item.letter} style={styles.letter} />
      const record = computePlayerRecord(item.player.id, matches)
      const winRate = record.played > 0 ? Math.round((record.wins / record.played) * 100) : undefined
      return (
        <View style={styles.item}>
          <PlayerRow
            player={item.player}
            tone={index % 3 === 1 ? "butter" : "yellow"}
            countries={playerCountries(item.player).join(" · ") || undefined}
            record={
              record.played > 0
                ? t("players.record", { count: record.played, rate: winRate })
                : t("players.noMatches")
            }
            onPress={() => navigation.navigate(PlayersRoutes.PLAYER_PROFILE, { playerId: item.player.id })}
          />
        </View>
      )
    },
    [matches, navigation, t]
  )

  const isFiltering = query.trim().length > 0 || country.length > 0

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <MeshBackground />
      <View style={styles.header}>
        <ScreenHeader
          variant="large"
          title={t("screens.players")}
          style={styles.title}
          right={<Text style={styles.total}>{t("players.total", { count: players.length })}</Text>}
        />
        <SearchField
          value={query}
          onChangeText={setQuery}
          placeholder={t("players.searchPlaceholder")}
          clearLabel={t("common.clear")}
        />
        {countries.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            <Chip label={t("players.filterAll")} selected={country === ""} onPress={() => setCountry("")} />
            {countries.map((code) => (
              <Chip
                key={code}
                label={code}
                selected={country === code}
                onPress={() => setCountry(country === code ? "" : code)}
              />
            ))}
          </ScrollView>
        ) : null}
      </View>

      <View style={styles.listWrapper}>
        <FlashList
          data={rows}
          keyExtractor={(item) => item.key}
          getItemType={(item) => item.type}
          renderItem={renderItem}
          contentContainerStyle={{ ...styles.listContent, paddingBottom: tabBarInset + 88 }}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            isFiltering ? (
              <EmptyState title={t("players.noResults")} />
            ) : (
              <EmptyState
                title={t("players.emptyTitle")}
                subtitle={t("players.emptySubtitle")}
                actionLabel={t("players.add")}
                onAction={() => navigation.navigate(PlayersRoutes.ADD_PLAYER)}
              />
            )
          }
        />
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t("players.add")}
        onPress={() => navigation.navigate(PlayersRoutes.ADD_PLAYER)}
        style={({ pressed }) => styles.fab(tabBarInset, pressed)}
      >
        <Plus size={24} color={theme.colors.text} />
      </Pressable>
    </View>
  )
}
