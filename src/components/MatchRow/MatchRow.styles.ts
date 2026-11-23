import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  row: (pressed: boolean) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: theme.radius.card,
    backgroundColor: theme.colors.card,
    boxShadow: theme.shadows.card,
    opacity: pressed ? 0.85 : 1,
  }),
  names: {
    flex: 1,
    minWidth: 0,
    gap: 3,
  },
  name: (winner: boolean) => ({
    fontFamily: winner ? theme.fonts.bold : theme.fonts.regular,
    fontSize: 14,
    color: winner ? theme.colors.text : theme.colors.textMuted,
  }),
  subtitle: {
    fontFamily: theme.fonts.regular,
    fontSize: 11.5,
    color: theme.colors.textMuted,
  },
  score: {
    fontFamily: theme.fonts.displayBold,
    fontSize: 14,
    letterSpacing: -0.3,
    color: theme.colors.text,
    fontVariant: ["tabular-nums"],
  },
}))
