import { StyleSheet } from "react-native-unistyles"

import { IS_WEB, WEB_CONTENT, WEB_SIDE_BAR_MIN_WIDTH } from "@/constants/Platform"

export const styles = StyleSheet.create((theme, rt) => {
  const compact = rt.screen.width < WEB_SIDE_BAR_MIN_WIDTH
  return {
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    searchWrapper: {
      ...WEB_CONTENT,
      padding: theme.spacing.md,
    },
    searchBar: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.lg,
    },
    searchInput: {
      flex: 1,
      paddingVertical: theme.spacing.sm,
      fontFamily: "Figtree_400Regular",
      fontSize: theme.typography.size.md,
      color: theme.colors.text,
    },
    listWrapper: {
      ...WEB_CONTENT,
      flex: 1,
      // FlashList ignores its content padding on web; phone-width web needs a gutter.
      paddingHorizontal: IS_WEB && rt.screen.width < WEB_SIDE_BAR_MIN_WIDTH ? theme.spacing.md : 0,
    },
    listContent: {
      paddingHorizontal: theme.spacing.md,
      paddingBottom: theme.spacing.xl,
    },
    separator: {
      height: theme.spacing.sm,
    },
    card: {
      backgroundColor: theme.colors.dark,
      borderRadius: theme.radius.xl,
      paddingVertical: compact ? theme.spacing.md : theme.spacing.lg,
      paddingHorizontal: compact ? theme.spacing.md : theme.spacing.lg,
      gap: compact ? theme.spacing.sm : theme.spacing.md,
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
      fontSize: compact ? theme.typography.size.md : theme.typography.size.lg,
      color: result === "trail" ? theme.colors.primary : theme.colors.white,
    }),
    score: (result: "lead" | "trail" | "tie") => ({
      fontFamily: "BricolageGrotesque_800ExtraBold",
      fontVariant: ["tabular-nums"],
      fontSize: compact ? 32 : 44,
      color: result === "trail" ? theme.colors.primary : theme.colors.white,
    }),
    footer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: compact ? theme.spacing.xs : theme.spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.colors.grey800,
    },
    date: {
      fontFamily: "Figtree_400Regular",
      fontSize: theme.typography.size.xs,
      color: theme.colors.grey400,
    },
    badge: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 2,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.primary,
    },
    badgeText: {
      fontFamily: "Figtree_700Bold",
      fontSize: theme.typography.size.xs,
      color: theme.colors.dark,
    },
  }
})
