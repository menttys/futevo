import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
  },
  input: {
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.md,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.grey600,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  submitButton: (enabled: boolean) => ({
    backgroundColor: enabled ? theme.colors.primary : theme.colors.grey600,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.sm,
    alignItems: "center",
  }),
  submitLabel: (enabled: boolean) => ({
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.sm,
    color: enabled ? theme.colors.dark : theme.colors.textMuted,
  }),
}))
