import React from "react"
import { Pressable, Text, View } from "react-native"

import { PlayerAvatar } from "@/components/PlayerAvatar"

import type { PlayerTileProps } from "./PlayerTile.d"
import { styles } from "./PlayerTile.styles"

export function PlayerTile({ player, onPress, selected = false, badgeLabel, badgeColor }: PlayerTileProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityState={{ selected }} style={styles.tile(selected)} onPress={onPress}>
      <View>
        <PlayerAvatar
          name={player.name}
          photoUri={player.photoUri || undefined}
          size={36}
          tone="yellow"
        />
        {badgeLabel && badgeColor ? (
          <View style={styles.badge(badgeColor)}>
            <Text style={styles.badgeText(badgeColor)}>{badgeLabel}</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {player.name}
      </Text>
    </Pressable>
  )
}
