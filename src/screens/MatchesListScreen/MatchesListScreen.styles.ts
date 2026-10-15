import { StyleSheet } from "react-native-unistyles"

import { IS_WEB, WEB_CONTENT, WEB_SIDE_BAR_MIN_WIDTH } from "@/constants/Platform"

// Same hues as the heat-map scale, deepened so they read as text.
const SCORE_GREEN = "#2E9E62"
const SCORE_RED = "#DD524A"

export const styles = StyleSheet.create((theme, rt) => ({
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
    fontFamily: "Sora-Regular",
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
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
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
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.md,
    color: theme.colors.text,
  },
  players: (winner: boolean) => ({
    fontFamily: winner ? "Sora-Bold" : "Sora-Regular",
    fontSize: theme.typography.size.sm,
    color: winner ? theme.colors.text : theme.colors.textMuted,
  }),
  score: (result: "lead" | "trail" | "tie") => ({
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.xl,
    color:
      result === "lead" ? SCORE_GREEN : result === "trail" ? SCORE_RED : theme.colors.textMuted,
  }),
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.grey600,
  },
  date: {
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.xs,
    color: theme.colors.textMuted,
  },
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
  },
  badgeText: {
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.xs,
    color: theme.colors.dark,
  },
}))
