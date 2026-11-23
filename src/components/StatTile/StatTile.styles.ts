import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  tile: {
    flex: 1,
    backgroundColor: theme.colors.card,
    boxShadow: theme.shadows.card,
    borderRadius: theme.radius.card,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  value: {
    fontFamily: theme.fonts.display,
    fontSize: 19,
    letterSpacing: -0.4,
    color: theme.colors.text,
  },
  label: {
    marginTop: 7,
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: theme.colors.textMuted,
  },
}))
