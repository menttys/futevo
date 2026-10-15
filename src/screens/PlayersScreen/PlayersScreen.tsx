import React, { useCallback } from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { FlashList } from "@shopify/flash-list"
import { useUnistyles } from "react-native-unistyles"

import type { Player } from "@/@types/futevo"
import { EmptyState } from "@/components/EmptyState"
import { PlayerAvatar } from "@/components/PlayerAvatar"
import { NewPlayerForm } from "@/forms/NewPlayerForm"
import { usePlayers } from "@/hooks/usePlayers"
import { Trash2, Users } from "@/lib/icons"
import { usePlayerStore } from "@/store/playerState"
import { useLanguage } from "@/i18n"

import { styles } from "./PlayersScreen.styles"

export function PlayersScreen() {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  const players = usePlayerStore((s) => s.players) ?? []
  const { savePlayer, deletePlayer } = usePlayers()

  const renderItem = useCallback(
    ({ item }: { item: Player }) => (
      <View style={styles.row}>
        <PlayerAvatar player={item} />
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <TouchableOpacity onPress={() => deletePlayer(item.id)} hitSlop={theme.hitSlop.md}>
          <Trash2 size={18} color={theme.colors.danger} />
        </TouchableOpacity>
      </View>
    ),
    [deletePlayer, theme]
  )

  return (
    <View style={styles.root}>
      <View style={styles.formWrapper}>
        <NewPlayerForm onSubmit={(player) => savePlayer(player)} />
      </View>
      <FlashList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        ListEmptyComponent={
          <EmptyState
            icon={Users}
            title={t("players.emptyTitle")}
            subtitle={t("players.emptySubtitle")}
          />
        }
      />
    </View>
  )
}
