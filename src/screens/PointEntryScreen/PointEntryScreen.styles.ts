import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  closeRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  content: {
    padding: theme.spacing.lg,
  },
  title: {
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.lg,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  sectionLabel: {
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.sm,
  },
  courtWrapper: {
    maxWidth: 320,
    alignSelf: "center",
    width: "100%",
  },
  ballOutButton: (active: boolean, disabled: boolean) => ({
    marginTop: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: active ? theme.colors.primary : theme.colors.grey400,
    backgroundColor: active ? theme.colors.primary : "transparent",
    paddingVertical: theme.spacing.md,
    alignItems: "center",
    opacity: disabled ? 0.4 : 1,
  }),
  ballOutLabel: (active: boolean, disabled: boolean) => ({
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.md,
    color: active ? theme.colors.dark : disabled ? theme.colors.textMuted : theme.colors.text,
  }),
  sectionSpacer: {
    height: theme.spacing.lg,
  },
  playersRow: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  playerOption: {
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  playerName: {
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.xs,
    color: theme.colors.text,
  },
  confirmButton: (enabled: boolean) => ({
    backgroundColor: enabled ? theme.colors.primary : theme.colors.grey600,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    alignItems: "center",
  }),
  confirmLabel: (enabled: boolean) => ({
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.md,
    color: enabled ? theme.colors.dark : theme.colors.textMuted,
  }),
}))
