import { StyleSheet } from "react-native-unistyles"

import { WEB_CONTENT } from "@/constants/Platform"

export const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
    paddingTop: rt.insets.top,
    backgroundColor: theme.colors.background,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.wash,
  },
  content: {
    ...WEB_CONTENT,
    paddingHorizontal: theme.gutter,
    gap: 12,
  },
  contentWide: {
    paddingHorizontal: 44,
    gap: 20,
  },
  scoreWide: {
    fontSize: 65,
    lineHeight: 72,
  },
  tabsWide: {
    width: 460,
  },
  summary: {
    gap: 12,
  },
  summaryWide: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 16,
  },
  momentumWide: {
    flex: 2,
  },
  pairWide: {
    flex: 2,
    flexDirection: "row",
    gap: 16,
  },
  // Result card: brand yellow, cropped mark, the score as supergraphic.
  result: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 18,
    overflow: "hidden",
  },
  watermark: {
    position: "absolute",
    right: -30,
    top: -34,
    opacity: 0.1,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  finalPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.onYellow,
  },
  finalLabel: {
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: theme.colors.text,
  },
  meta: {
    flex: 1,
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    color: theme.colors.text,
  },
  sides: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 12,
    marginTop: 14,
  },
  side: {
    flex: 1,
    minWidth: 0,
  },
  sideRight: {
    alignItems: "flex-end",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  name: (away: boolean) => ({
    flexShrink: 1,
    fontFamily: theme.fonts.semibold,
    fontSize: 13,
    color: away ? theme.colors.purple : theme.colors.text,
  }),
  dupla: {
    marginTop: 3,
    fontFamily: theme.fonts.regular,
    fontSize: 11.5,
    color: theme.colors.text,
  },
  scores: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  score: (away: boolean) => ({
    fontFamily: theme.fonts.display,
    fontSize: 56,
    lineHeight: 62,
    letterSpacing: -1.1,
    color: away ? theme.colors.purple : theme.colors.text,
    fontVariant: ["tabular-nums"],
  }),
  card: {
    backgroundColor: theme.colors.card,
    boxShadow: theme.shadows.card,
    borderRadius: theme.radius.card,
    padding: 14,
  },
  cardLabel: {
    marginBottom: 8,
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: theme.colors.text,
  },
  pair: {
    flexDirection: "row",
    gap: 10,
  },
  half: {
    flex: 1,
  },
  empty: {
    fontFamily: theme.fonts.regular,
    fontSize: 13,
    color: theme.colors.textMuted,
  },
}))
