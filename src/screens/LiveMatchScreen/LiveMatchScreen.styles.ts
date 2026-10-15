import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    justifyContent: "space-between",
  },
  targetLabel: {
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  footerButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  footerButtonDisabled: {
    opacity: 0.4,
  },
  footerButtonLabel: {
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.text,
  },
  finishButton: {
    backgroundColor: theme.colors.danger + "22",
  },
  finishLabel: {
    color: theme.colors.danger,
  },
}))
