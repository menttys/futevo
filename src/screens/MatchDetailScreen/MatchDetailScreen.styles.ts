import { StyleSheet } from "react-native-unistyles"

import { WEB_CONTENT } from "@/constants/Platform"

export const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    ...WEB_CONTENT,
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.lg,
  },
  backButton: {
    paddingHorizontal: theme.spacing.md,
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
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.md,
    color: theme.colors.dark,
  },
  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.grey200,
    padding: theme.spacing.lg,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: theme.colors.grey200,
    borderRadius: theme.radius.full,
    padding: theme.spacing.xs,
  },
  tab: (selected: boolean) => ({
    flex: 1,
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.full,
    backgroundColor: selected ? theme.colors.card : "transparent",
  }),
  tabLabel: (selected: boolean) => ({
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.sm,
    color: selected ? theme.colors.text : theme.colors.textMuted,
  }),
  teamColumn: {
    alignItems: "center",
    gap: theme.spacing.xs,
    flex: 1,
  },
  clubName: (color: string) => ({
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.lg,
    color,
    textAlign: "center",
  }),
  teamNames: (color: string, hasClub = false) => ({
    fontFamily: hasClub ? "Figtree_400Regular" : "Figtree_700Bold",
    fontSize: hasClub ? theme.typography.size.xs : theme.typography.size.sm,
    color: hasClub ? theme.colors.textMuted : color,
    textAlign: "center",
  }),
  teamScore: (color: string) => ({
    fontFamily: "BricolageGrotesque_800ExtraBold",
    fontVariant: ["tabular-nums"],
    fontSize: 48,
    color,
  }),
  sectionLabel: {
    fontFamily: "Figtree_600SemiBold",
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
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.xs,
    color: theme.colors.text,
  },
}))
