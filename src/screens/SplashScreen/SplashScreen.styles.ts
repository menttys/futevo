import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.md,
  },
  wordmark: {
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.xxl,
    letterSpacing: 4,
    color: theme.colors.primary,
  },
  tagline: {
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
  },
}))
