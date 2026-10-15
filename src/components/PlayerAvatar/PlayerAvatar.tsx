import { Image, Text, View } from "react-native"

import type { PlayerAvatarProps } from "./PlayerAvatar.d"
import { styles } from "./PlayerAvatar.styles"

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ""
  const second = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : ""
  return (first + second).toUpperCase()
}

export function PlayerAvatar({ name, photoUri, size = 40, selected = false, style }: PlayerAvatarProps) {
  return (
    <View style={[styles.circle(size, selected), style]}>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.photo(size)} />
      ) : (
        <Text style={styles.initials(size)}>{getInitials(name)}</Text>
      )}
    </View>
  )
}
