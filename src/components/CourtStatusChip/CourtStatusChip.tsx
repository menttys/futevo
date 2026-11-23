import React from "react"
import { Text, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import { PlayerAvatar } from "@/components/PlayerAvatar"
import { HandGrab } from "@/lib/icons"

import type { CourtStatusChipProps } from "./CourtStatusChip.d"
import { AVATAR_SIZE, styles } from "./CourtStatusChip.styles"

// Court-mode status: who is being handled, what is happening, and a coloured status dot.
export function CourtStatusChip({ title, subtitle, tone, player }: CourtStatusChipProps) {
  const { theme } = useUnistyles()
  return (
    <View style={styles.chip} accessibilityRole="text" accessibilityLiveRegion="polite">
      {player ? (
        <PlayerAvatar
          name={player.name}
          photoUri={player.photoUri}
          size={AVATAR_SIZE}
          tone={player.team === "A" ? "dark" : "yellow"}
        />
      ) : (
        <View style={styles.glyph}>
          <HandGrab size={16} color={theme.colors.primary} />
        </View>
      )}
      <View style={styles.text}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      <View style={styles.dot(tone)} />
    </View>
  )
}
