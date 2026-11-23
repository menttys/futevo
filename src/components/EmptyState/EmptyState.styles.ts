import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.xl,
    paddingTop: 48,
    gap: 10,
  },
  disc: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    marginBottom: 4,
  },
  title: {
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
  action: {
    marginTop: 4,
    minHeight: 0,
    paddingHorizontal: 22,
    paddingVertical: 11,
  },
}))
