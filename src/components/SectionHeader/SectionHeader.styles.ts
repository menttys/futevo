import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  row: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontFamily: theme.fonts.displayBold,
    fontSize: 13.3,
    letterSpacing: -0.3,
    color: theme.colors.text,
  },
  action: {
    fontFamily: theme.fonts.semibold,
    fontSize: 13,
    color: theme.colors.text,
  },
  // Small caps label: TODAY, TARGET SCORE, LANGUAGE …
  label: {
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: theme.colors.textMuted,
  },
}))
