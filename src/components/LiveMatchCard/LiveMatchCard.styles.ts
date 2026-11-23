import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  card: (compact: boolean) => ({
    backgroundColor: theme.colors.primary,
    borderRadius: compact ? theme.radius.card : theme.radius.lg,
    padding: compact ? undefined : 18,
    paddingHorizontal: compact ? 16 : 18,
    paddingVertical: compact ? 14 : 18,
    overflow: "hidden",
    gap: 12,
  }),
  watermark: (compact: boolean) => ({
    position: "absolute",
    right: compact ? -18 : -34,
    top: compact ? -22 : -30,
    opacity: 0.1,
  }),
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  meta: {
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    color: theme.colors.text,
  },
  sides: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  sideRight: {
    alignItems: "flex-end",
  },
  name: (away: boolean) => ({
    fontFamily: theme.fonts.semibold,
    fontSize: 13,
    color: away ? theme.colors.purple : theme.colors.text,
  }),
  bigScore: (away: boolean) => ({
    marginTop: 8,
    fontFamily: theme.fonts.display,
    fontSize: 40,
    letterSpacing: -0.8,
    color: away ? theme.colors.purple : theme.colors.text,
    fontVariant: ["tabular-nums"],
  }),
  action: (pressed: boolean) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 13,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.onYellow,
    opacity: pressed ? 0.85 : 1,
  }),
  actionLabel: {
    fontFamily: theme.fonts.bold,
    fontSize: 15,
    color: theme.colors.text,
  },
  // compact
  compactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  compactNames: {
    flex: 1,
    gap: 3,
  },
  compactName: (away: boolean) => ({
    fontFamily: theme.fonts.semibold,
    fontSize: 14,
    color: away ? theme.colors.purple : theme.colors.text,
  }),
  compactScore: {
    fontFamily: theme.fonts.display,
    fontSize: 25,
    letterSpacing: -0.5,
    color: theme.colors.text,
    fontVariant: ["tabular-nums"],
  },
  compactScoreAway: {
    color: theme.colors.purple,
  },
}))
