import React from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { PlayerAvatar } from "@/components/PlayerAvatar"

import type { PlayerTileProps } from "./PlayerTile.d"
import { styles } from "./PlayerTile.styles"

export function PlayerTile({ player, onPress, selected = false, badgeLabel, badgeColor }: PlayerTileProps) {
  return (
    <TouchableOpacity style={styles.tile(selected)} activeOpacity={0.7} onPress={onPress}>
      <View>
        <PlayerAvatar
          name={player.name}
          photoUri={player.photoUri || undefined}
          size={64}
          selected={selected}
        />
        {badgeLabel && badgeColor ? (
          <View style={styles.badge(badgeColor)}>
            <Text style={styles.badgeText}>{badgeLabel}</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {player.name}
      </Text>
    </TouchableOpacity>
  )
}
