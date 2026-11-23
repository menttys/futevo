import { StyleSheet } from "react-native-unistyles"

import type { CourtStatusTone } from "./CourtStatusChip.d"

export const AVATAR_SIZE = 30

export const styles = StyleSheet.create((theme) => {
  const dot: Record<CourtStatusTone, string> = {
    active: theme.colors.primary,
    success: theme.colors.success,
    error: theme.colors.danger,
  }
  const ring: Record<CourtStatusTone, string> = {
    active: "rgba(255,212,0,0.3)",
    success: "rgba(30,158,98,0.25)",
    error: "rgba(194,24,91,0.25)",
  }
  return {
    // Sits above the court, out from under the finger.
    chip: {
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      maxWidth: "88%",
      paddingVertical: 6,
      paddingLeft: 6,
      paddingRight: 16,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.wash,
    },
    glyph: {
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
      borderRadius: AVATAR_SIZE / 2,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.dark,
    },
    text: {
      flexShrink: 1,
    },
    title: {
      fontFamily: theme.fonts.semibold,
      fontSize: 13,
      color: theme.colors.text,
    },
    subtitle: {
      fontFamily: theme.fonts.regular,
      fontSize: 11.5,
      color: theme.colors.textMuted,
    },
    dot: (tone: CourtStatusTone) => ({
      width: 9,
      height: 9,
      borderRadius: 4.5,
      marginLeft: 6,
      backgroundColor: dot[tone],
      boxShadow: `0px 0px 0px 3px ${ring[tone]}`,
    }),
  }
})
