import { StyleSheet } from "react-native-unistyles"

import { WEB_CONTENT } from "@/constants/Platform"

export const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  targetLabel: {
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
    textAlign: "center",
  },
  actions: {
    ...WEB_CONTENT,
    flexDirection: "row",
    justifyContent: "center",
    gap: theme.spacing.sm,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  courtModeButton: {
    flex: 1,
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
  },
  courtModeLabel: {
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.md,
    color: theme.colors.dark,
  },
  actionButtonDisabled: {
    opacity: 0.4,
  },
  actionButtonLabel: {
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.text,
  },
  logHeader: {
    ...WEB_CONTENT,
    marginTop: theme.spacing.sm,
  },
  logTitle: {
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
  },
  logScroll: {
    flex: 1,
  },
  logContent: {
    ...WEB_CONTENT,
    paddingBottom: theme.spacing.xl,
  },
  finishButton: {
    backgroundColor: theme.colors.danger + "22",
  },
  finishLabel: {
    color: theme.colors.danger,
  },
}))
