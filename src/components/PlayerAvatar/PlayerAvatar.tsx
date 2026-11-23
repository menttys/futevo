import { Image, Text, View } from "react-native"

import type { PlayerAvatarProps } from "./PlayerAvatar.d"
import { styles } from "./PlayerAvatar.styles"

// One initial in a disc, as in the designs (photo when there is one).
function getInitial(name: string): string {
  return (name.trim()[0] ?? "").toUpperCase()
}

export function PlayerAvatar({
  name,
  photoUri,
  size = 40,
  selected = false,
  tone = "neutral",
  style,
}: PlayerAvatarProps) {
  return (
    <View style={[styles.circle(size, selected, tone), style]}>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.photo(size)} />
      ) : (
        <Text style={styles.initials(size, tone)}>{getInitial(name)}</Text>
      )}
    </View>
  )
}
