import React from "react"
import { Pressable, Text } from "react-native"

import { PlayerAvatar } from "@/components/PlayerAvatar"

import type { PlayerTileProps } from "./PlayerTile.d"
import { styles } from "./PlayerTile.styles"

export function PlayerTile({ player, onPress, selected = false }: PlayerTileProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={styles.tile(selected)}
      onPress={onPress}
    >
      <PlayerAvatar
        name={player.name}
        photoUri={player.photoUri || undefined}
        size={36}
        tone="yellow"
      />
      <Text style={styles.name} numberOfLines={1}>
        {player.name}
      </Text>
    </Pressable>
  )
}
