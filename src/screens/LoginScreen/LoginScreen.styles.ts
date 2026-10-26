import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.xl,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.md,
  },
  wordmark: {
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.xxl,
    letterSpacing: 4,
    color: theme.colors.primary,
  },
  title: {
    marginTop: theme.spacing.lg,
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.xl,
    color: theme.colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Figtree_400Regular",
    fontSize: theme.typography.size.md,
    color: theme.colors.textMuted,
    textAlign: "center",
  },
  footer: {
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  googleButton: {
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    alignItems: "center",
  },
  googleButtonPressed: {
    opacity: 0.85,
  },
  googleButtonText: {
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.md,
    color: theme.colors.dark,
  },
}))
