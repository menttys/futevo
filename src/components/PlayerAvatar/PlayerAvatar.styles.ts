import { StyleSheet } from "react-native-unistyles"

import type { PlayerAvatarTone } from "./PlayerAvatar.d"

export const styles = StyleSheet.create((theme) => {
  const disc: Record<PlayerAvatarTone, string> = {
    neutral: theme.colors.stone,
    yellow: theme.colors.primary,
    dark: theme.colors.dark,
    butter: theme.colors.butter,
  }
  return {
    circle: (size: number, selected: boolean, tone: PlayerAvatarTone) => ({
      width: size,
      height: size,
      borderRadius: size / 2,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      backgroundColor: disc[tone],
      borderWidth: selected ? 3 : 0,
      borderColor: theme.colors.dark,
    }),
    photo: (size: number) => ({
      width: size,
      height: size,
    }),
    initials: (size: number, tone: PlayerAvatarTone) => ({
      fontFamily: theme.fonts.displayBold,
      fontSize: Math.max(9.5, size * 0.3),
      letterSpacing: -0.2,
      color: tone === "dark" ? theme.colors.primary : theme.colors.text,
    }),
  }
})
