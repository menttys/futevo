import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  card: (pressed: boolean) => ({
    backgroundColor: theme.colors.card,
    boxShadow: theme.shadows.card,
    borderRadius: theme.radius.card,
    padding: 14,
    gap: 10,
    opacity: pressed ? 0.85 : 1,
  }),
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: theme.colors.text,
  },
  more: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  moreLabel: {
    fontFamily: theme.fonts.semibold,
    fontSize: 12,
    color: theme.colors.textMuted,
  },
  tiles: {
    flexDirection: "row",
    gap: 8,
  },
  tile: {
    backgroundColor: theme.colors.wash,
    boxShadow: "none",
    paddingVertical: 9,
  },
  streakNote: {
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    color: theme.colors.textMuted,
  },
  empty: {
    fontFamily: theme.fonts.regular,
    fontSize: 13,
    color: theme.colors.textMuted,
  },
}))
