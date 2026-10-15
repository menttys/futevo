import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  name: {
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.lg,
    color: theme.colors.text,
  },
  email: {
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
  },
  signOutButton: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.danger,
    paddingVertical: theme.spacing.md,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: theme.spacing.sm,
  },
  signOutLabel: {
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.md,
    color: theme.colors.danger,
  },
}))
