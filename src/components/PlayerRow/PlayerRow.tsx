import React from "react"
import { Pressable, Text, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import { PlayerAvatar } from "@/components/PlayerAvatar"
import { ChevronRight } from "@/lib/icons"

import type { PlayerRowProps } from "./PlayerRow.d"
import { styles } from "./PlayerRow.styles"

// Compact player tile: avatar, name, country pill and a quick record.
export function PlayerRow({ player, countries, record, tone = "yellow", onPress }: PlayerRowProps) {
  const { theme } = useUnistyles()
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => styles.row(pressed)}>
      <PlayerAvatar name={player.name} photoUri={player.photoUri || undefined} size={44} tone={tone} />
      <View style={styles.text}>
        <Text style={styles.name} numberOfLines={1}>
          {player.name}
        </Text>
        {countries || record ? (
          <View style={styles.meta}>
            {countries ? (
              <View style={styles.pill}>
                <Text style={styles.pillLabel}>{countries}</Text>
              </View>
            ) : null}
            {record ? (
              <Text style={styles.record} numberOfLines={1}>
                {record}
              </Text>
            ) : null}
          </View>
        ) : null}
      </View>
      <ChevronRight size={18} color={theme.colors.text} />
    </Pressable>
  )
}
