import { StyleSheet } from "react-native-unistyles"

import { WEB_CONTENT } from "@/constants/Platform"

export const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    ...WEB_CONTENT,
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  card: {
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
  },
  photoSection: {
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  },
  linkText: {
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.text,
  },
  label: {
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.grey300,
    marginBottom: theme.spacing.xs,
  },
  input: {
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.md,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.grey600,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  saveButton: (enabled: boolean) => ({
    backgroundColor: enabled ? theme.colors.primary : theme.colors.grey600,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    alignItems: "center",
  }),
  saveLabel: (enabled: boolean) => ({
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.sm,
    color: enabled ? theme.colors.dark : theme.colors.textMuted,
  }),
  deleteButton: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.danger,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    alignItems: "center",
  },
  deleteLabel: {
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.danger,
  },
}))
