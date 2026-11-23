import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  // The live scoreboard: soft yellow, with a big brand-yellow mark at 75%.
  card: {
    backgroundColor: theme.colors.softYellow,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 16,
    overflow: "hidden",
  },
  watermark: {
    position: "absolute",
    right: -70,
    top: -60,
    opacity: 0.75,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  name: (away: boolean) => ({
    flexShrink: 1,
    fontFamily: theme.fonts.semibold,
    fontSize: 12,
    color: away ? theme.colors.purple : theme.colors.text,
  }),
  scores: {
    marginTop: 14,
    marginBottom: 10,
  },
  score: (away: boolean) => ({
    fontFamily: theme.fonts.display,
    fontSize: 83,
    lineHeight: 90,
    letterSpacing: -1.6,
    color: away ? theme.colors.purple : theme.colors.text,
    fontVariant: ["tabular-nums"],
  }),
  note: {
    flexShrink: 1,
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    color: theme.colors.text,
  },
}))
