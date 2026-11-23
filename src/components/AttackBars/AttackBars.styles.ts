import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  list: {
    gap: 11,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    width: 58,
    fontFamily: theme.fonts.semibold,
    fontSize: 12,
    color: theme.colors.text,
  },
  track: {
    flex: 1,
    height: 10,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.stone,
    overflow: "hidden",
  },
  fill: (pct: number) => ({
    width: `${pct}%`,
    height: "100%",
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.text,
  }),
  count: {
    minWidth: 14,
    fontFamily: theme.fonts.semibold,
    fontSize: 12,
    color: theme.colors.text,
    textAlign: "right",
  },
}))
