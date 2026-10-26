import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  root: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey200,
  },
  dot: (side: "A" | "B") => ({
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: side === "A" ? theme.colors.teamA : theme.colors.primary,
  }),
  label: {
    flex: 1,
    fontFamily: "Figtree_400Regular",
    fontSize: theme.typography.size.sm,
    color: theme.colors.text,
  },
  score: {
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
  },
}))
