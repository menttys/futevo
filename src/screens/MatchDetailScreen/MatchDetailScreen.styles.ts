import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.lg,
  },
  winnerBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
  },
  winnerText: {
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.md,
    color: theme.colors.dark,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.lg,
  },
  teamColumn: {
    alignItems: "center",
    gap: theme.spacing.xs,
    flex: 1,
  },
  teamNames: {
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.text,
    textAlign: "center",
  },
  teamScore: (color: string) => ({
    fontFamily: "Sora-Bold",
    fontSize: 48,
    color,
  }),
  sectionLabel: {
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
  },
  tallyRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  },
  tallyChip: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.full,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
  },
  tallyText: {
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.xs,
    color: theme.colors.text,
  },
  pointRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey700,
  },
  pointLabel: {
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.sm,
    color: theme.colors.text,
  },
  pointScore: {
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
  },
}))
