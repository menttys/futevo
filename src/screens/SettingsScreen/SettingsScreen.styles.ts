import { StyleSheet } from "react-native-unistyles"

import { WEB_CONTENT } from "@/constants/Platform"

export const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    ...WEB_CONTENT,
    paddingHorizontal: theme.gutter,
    gap: 14,
  },
  title: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  // Light yellow to butter gradient profile card with a yellow mark watermark.
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
  },
  profileMark: {
    position: "absolute",
    right: -20,
    top: -26,
    opacity: 0.55,
  },
  profileText: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontFamily: theme.fonts.displayBold,
    fontSize: 14,
    letterSpacing: -0.3,
    color: theme.colors.text,
  },
  email: {
    marginTop: 7,
    fontFamily: theme.fonts.regular,
    fontSize: 12.5,
    color: theme.colors.text,
  },
  label: {
    marginBottom: 6,
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: theme.colors.text,
  },
  card: {
    borderRadius: theme.radius.card,
    backgroundColor: theme.colors.card,
    boxShadow: theme.shadows.card,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  rowText: {
    flex: 1,
  },
  rowTitle: {
    fontFamily: theme.fonts.semibold,
    fontSize: 15,
    color: theme.colors.text,
  },
  rowSubtitle: {
    marginTop: 2,
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    color: theme.colors.textMuted,
  },
  signOut: {
    backgroundColor: theme.colors.wash,
  },
  tape: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
    opacity: 0.8,
    paddingTop: 2,
  },
}))
