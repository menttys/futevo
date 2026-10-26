import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  root: {
    gap: theme.spacing.lg,
  },
  team: {
    gap: theme.spacing.sm,
  },
  teamTitle: {
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.md,
    color: theme.colors.text,
  },
  card: (side: "A" | "B") => ({
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    borderLeftWidth: 4,
    borderLeftColor: side === "A" ? theme.colors.teamA : theme.colors.primary,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  }),
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  playerName: {
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.md,
    color: theme.colors.text,
  },
  sideTag: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.full,
    paddingVertical: 2,
    paddingHorizontal: theme.spacing.sm,
  },
  sideTagText: {
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.xs,
    color: theme.colors.textMuted,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.grey200,
  },
  statLabel: {
    fontFamily: "Figtree_400Regular",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
  },
  statValue: {
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.md,
    color: theme.colors.text,
  },
}))
