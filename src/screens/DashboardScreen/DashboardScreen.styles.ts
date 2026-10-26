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
  sectionTitle: {
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.lg,
    color: theme.colors.text,
  },
  empty: {
    fontFamily: "Figtree_400Regular",
    fontSize: theme.typography.size.md,
    color: theme.colors.textMuted,
  },
  card: {
    backgroundColor: theme.colors.dark,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  teamRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  teamInfo: {
    flex: 1,
    gap: 2,
  },
  club: {
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.xs,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: theme.colors.grey400,
  },
  players: (result: "lead" | "trail" | "tie") => ({
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.md,
    color: result === "trail" ? theme.colors.primary : theme.colors.white,
  }),
  score: (result: "lead" | "trail" | "tie") => ({
    fontFamily: "BricolageGrotesque_800ExtraBold",
    fontVariant: ["tabular-nums"],
    fontSize: 32,
    color: result === "trail" ? theme.colors.primary : theme.colors.white,
  }),
  date: {
    paddingTop: theme.spacing.xs,
    borderTopWidth: 1,
    borderTopColor: theme.colors.grey800,
    fontFamily: "Figtree_400Regular",
    fontSize: theme.typography.size.xs,
    color: theme.colors.grey400,
  },
}))
