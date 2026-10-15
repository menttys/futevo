import { Text, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import type { PlayerAvatarProps } from "./PlayerAvatar.d"
import { styles } from "./PlayerAvatar.styles"

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ""
  const second = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : ""
  return (first + second).toUpperCase()
}

export function PlayerAvatar({ player, size = 40, selected = false, style }: PlayerAvatarProps) {
  const { theme } = useUnistyles()
  const backgroundColor = player.color ?? theme.colors.primary

  return (
    <View style={[styles.circle(size, selected), { backgroundColor }, style]}>
      <Text style={styles.initials(size)}>{getInitials(player.name)}</Text>
    </View>
  )
}
