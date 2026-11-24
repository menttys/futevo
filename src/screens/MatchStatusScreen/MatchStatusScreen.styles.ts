import { StyleSheet } from "react-native-unistyles"

import { WEB_CONTENT } from "@/constants/Platform"

export const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: rt.insets.top,
  },
  content: {
    ...WEB_CONTENT,
    paddingHorizontal: theme.gutter,
    paddingBottom: 16,
    gap: 12,
  },
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
