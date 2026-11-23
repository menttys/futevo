import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  title: {
    marginTop: 6,
    fontFamily: theme.fonts.displayBold,
    fontSize: 15,
    letterSpacing: -0.3,
    color: theme.colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: theme.fonts.regular,
    fontSize: 13,
    color: theme.colors.textMuted,
    textAlign: "center",
  },
  detail: {
    fontFamily: theme.fonts.regular,
    fontSize: 11.5,
    color: theme.colors.textMuted,
    textAlign: "center",
  },
  action: {
    marginTop: 4,
    minHeight: 0,
    paddingHorizontal: 22,
    paddingVertical: 11,
  },
}))
