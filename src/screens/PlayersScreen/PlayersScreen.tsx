import React, { useCallback, useMemo, useState } from "react"
import { ScrollView, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from "react-native"

import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { FlashList } from "@shopify/flash-list"
import { useUnistyles } from "react-native-unistyles"

import type { Player } from "@/@types/futevo"
import { EmptyState } from "@/components/EmptyState"
import { PlayerTile } from "@/components/PlayerTile"
import { Plus, Search, Users } from "@/lib/icons"
import { PlayersRoutes } from "@/navigation/routes"
import type { PlayersStackParamList } from "@/navigation/types/navigation"
import { usePlayerStore } from "@/store/playerState"
import { useLanguage } from "@/i18n"
import { getCountryName, getFlagEmoji } from "@/utils/countries"

import { styles } from "./PlayersScreen.styles"

export function PlayersScreen() {
  const { t, currentLanguage } = useLanguage()
  const { theme } = useUnistyles()
  const storedPlayers = usePlayerStore((s) => s.players)
  const players = useMemo(() => storedPlayers ?? [], [storedPlayers])
  const navigation = useNavigation<StackNavigationProp<PlayersStackParamList, "PlayersHome">>()
  const { width } = useWindowDimensions()
  const numColumns = width >= 900 ? 4 : width >= 600 ? 3 : 2
  const [query, setQuery] = useState("")
  const [country, setCountry] = useState("")

  const countries = useMemo(() => {
    const codes = new Set<string>()
    players.forEach((p) => p.residencyCountry && codes.add(p.residencyCountry))
    return Array.from(codes)
      .map((code) => ({ code, name: getCountryName(code, currentLanguage) }))
      .sort((a, b) => a.name.localeCompare(b.name, currentLanguage))
  }, [players, currentLanguage])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return players.filter(
      (p) =>
        (!q || p.name.toLowerCase().includes(q)) && (!country || p.residencyCountry === country)
    )
  }, [players, query, country])

  const renderItem = useCallback(
    ({ item }: { item: Player }) => (
      <View style={styles.tileWrapper}>
        <PlayerTile
          player={item}
          onPress={() => navigation.navigate(PlayersRoutes.PLAYER_PROFILE, { playerId: item.id })}
        />
        {item.residencyCountry ? (
          <Text style={styles.flag}>{getFlagEmoji(item.residencyCountry)}</Text>
        ) : null}
      </View>
    ),
    [navigation]
  )

  const isFiltering = query.trim().length > 0 || country.length > 0

  return (
    <View style={styles.root}>
      <View style={styles.toolbar}>
        <View style={styles.searchField}>
          <Search size={18} color={theme.colors.grey300} />
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder={t("players.searchPlaceholder")}
            placeholderTextColor={theme.colors.grey300}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate(PlayersRoutes.ADD_PLAYER)}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel={t("players.add")}
        >
          <Plus size={22} color={theme.colors.dark} />
        </TouchableOpacity>
      </View>
      {countries.length > 0 ? (
        <View style={styles.chipsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            <TouchableOpacity
              style={styles.chip(country === "")}
              onPress={() => setCountry("")}
              activeOpacity={0.85}
            >
              <Text style={styles.chipLabel(country === "")}>{t("players.filterAll")}</Text>
            </TouchableOpacity>
            {countries.map((c) => (
              <TouchableOpacity
                key={c.code}
                style={styles.chip(country === c.code)}
                onPress={() => setCountry(country === c.code ? "" : c.code)}
                activeOpacity={0.85}
              >
                <Text style={styles.chipLabel(country === c.code)}>
                  {getFlagEmoji(c.code)} {c.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : null}
      <View style={styles.listWrapper}>
        <FlashList
          key={numColumns}
          data={filtered}
          numColumns={numColumns}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            isFiltering ? (
              <EmptyState icon={Search} title={t("players.noResults")} />
            ) : (
              <EmptyState
                icon={Users}
                title={t("players.emptyTitle")}
                subtitle={t("players.emptySubtitle")}
              />
            )
          }
        />
      </View>
    </View>
  )
}
