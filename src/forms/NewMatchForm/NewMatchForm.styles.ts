import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.spacing.lg,
  },
  sectionLabel: {
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.sm,
  },
  playersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md,
  },
  playerOption: {
    alignItems: "center",
    gap: theme.spacing.xs,
    width: 72,
  },
  playerName: {
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.xs,
    color: theme.colors.text,
    textAlign: "center",
  },
  badge: (color: string) => ({
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: color,
    borderRadius: theme.radius.full,
    paddingHorizontal: 6,
    paddingVertical: 2,
  }),
  badgeText: {
    fontFamily: "Sora-Bold",
    fontSize: 10,
    color: theme.colors.dark,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  stepperButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  stepperLabel: {
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.lg,
    color: theme.colors.text,
  },
  scoreValue: {
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.xl,
    color: theme.colors.primary,
    minWidth: 48,
    textAlign: "center",
  },
  details: {
    gap: theme.spacing.sm,
  },
  detailsBody: {
    gap: theme.spacing.sm,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  },
  chip: (selected: boolean) => ({
    backgroundColor: selected ? theme.colors.primary : theme.colors.surface,
    borderRadius: theme.radius.full,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
  }),
  chipLabel: {
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.xs,
    color: theme.colors.text,
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
  lockedClub: {
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
  },
  hint: {
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.xs,
    color: theme.colors.textMuted,
  },
  submitButton: (enabled: boolean) => ({
    backgroundColor: enabled ? theme.colors.primary : theme.colors.grey600,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    alignItems: "center",
  }),
  submitLabel: (enabled: boolean) => ({
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.md,
    color: enabled ? theme.colors.dark : theme.colors.textMuted,
  }),
}))
