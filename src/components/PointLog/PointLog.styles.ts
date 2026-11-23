import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  root: {
    backgroundColor: theme.colors.card,
    boxShadow: theme.shadows.card,
    borderRadius: theme.radius.card,
    paddingHorizontal: 14,
  },
  row: (last: boolean) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 11,
    borderBottomWidth: last ? 0 : 1,
    borderBottomColor: theme.colors.wash,
  }),
  // Home blue-black, Away deep purple.
  dot: (side: "A" | "B") => ({
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: side === "A" ? theme.colors.teamA : theme.colors.teamB,
  }),
  label: {
    flex: 1,
    fontFamily: theme.fonts.regular,
    fontSize: 13.5,
    color: theme.colors.text,
  },
  score: {
    fontFamily: theme.fonts.displayBold,
    fontSize: 13,
    color: theme.colors.text,
    fontVariant: ["tabular-nums"],
  },
}))
