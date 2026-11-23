import React, { useEffect, useMemo, useState } from "react"
import { Modal, Pressable, ScrollView, Text, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import { AppButton } from "@/components/AppButton"
import { EmptyState } from "@/components/EmptyState"
import { PlayerTile } from "@/components/PlayerTile"
import { SearchField } from "@/components/SearchField"
import { IS_WEB } from "@/constants/Platform"
import { useLanguage } from "@/i18n"
import { X } from "@/lib/icons"

import type { PlayerPickerModalProps } from "./PlayerPickerModal.d"
import { styles } from "./PlayerPickerModal.styles"

export function PlayerPickerModal({
  visible,
  title,
  players,
  selectedIds,
  max,
  slotLabels,
  slotColor,
  onChange,
  onClose,
}: PlayerPickerModalProps) {
  const { t } = useLanguage()
  const { theme } = useUnistyles()
  const [query, setQuery] = useState("")
  const [draftIds, setDraftIds] = useState<string[]>(selectedIds)

  // Start each opening from the committed selection; edits stay local until Done.
  useEffect(() => {
    if (visible) setDraftIds(selectedIds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? players.filter((p) => p.name.toLowerCase().includes(q)) : players
  }, [players, query])

  const toggle = (playerId: string) => {
    if (draftIds.includes(playerId)) setDraftIds(draftIds.filter((id) => id !== playerId))
    else if (max === 1) setDraftIds([playerId])
    else if (draftIds.length < max) setDraftIds([...draftIds, playerId])
  }

  const done = () => {
    onChange(draftIds)
    close()
  }

  const close = () => {
    setQuery("")
    onClose()
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType={IS_WEB ? "fade" : "slide"}
      onRequestClose={close}
    >
      <View style={IS_WEB ? styles.overlayWeb : styles.overlay}>
        <View style={IS_WEB ? styles.floating : styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>{title ?? t("newMatch.selectPlayers")}</Text>
            <View style={styles.headerRight}>
              <Text style={styles.counter}>
                {draftIds.length}/{max}
              </Text>
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
            {filtered.length === 0 ? (
              <EmptyState title={t("players.noResults")} />
            ) : (
              filtered.map((player) => {
                const index = draftIds.indexOf(player.id)
                const selected = index !== -1
                return (
                  <View key={player.id} style={styles.cell}>
                    <PlayerTile
                      player={player}
                      selected={selected}
                      badgeLabel={selected ? slotLabels[index] : undefined}
                      badgeColor={selected ? slotColor(index) : undefined}
                      onPress={() => toggle(player.id)}
                    />
                  </View>
                )
              })
            )}
          </ScrollView>
          <AppButton label={t("newMatch.done")} onPress={done} />
        </View>
      </View>
    </Modal>
  )
}
