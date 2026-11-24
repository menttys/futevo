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
    gap: 16,
  },
  contentWide: {
    paddingHorizontal: 44,
    gap: 20,
  },
  headerWide: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 20,
  },
  colMain: {
    flex: 2,
  },
  colSide: {
    flex: 1,
    gap: 16,
  },
  listWide: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
  },
  cell: {
    flexBasis: "48%",
    flexGrow: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  wordmark: {
    fontFamily: theme.fonts.display,
    fontSize: 19,
    letterSpacing: -0.4,
    color: theme.colors.text,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
  },
  avatarText: {
    fontFamily: theme.fonts.displayBold,
    fontSize: 12,
    color: theme.colors.text,
  },
  date: {
    fontFamily: theme.fonts.semibold,
    fontSize: 11,
    letterSpacing: 1.1,
    textTransform: "uppercase",
    color: theme.colors.textMuted,
  },
  greeting: {
    marginTop: 8,
    fontFamily: theme.fonts.display,
    fontSize: 22,
    lineHeight: 24,
    letterSpacing: -0.45,
    color: theme.colors.text,
  },
  startCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    padding: 18,
    gap: 10,
    overflow: "hidden",
  },
  startWatermark: {
    position: "absolute",
    right: -34,
    top: -30,
    opacity: 0.1,
  },
  startTitle: {
    fontFamily: theme.fonts.display,
    fontSize: 20,
    letterSpacing: -0.4,
    color: theme.colors.text,
  },
  startSubtitle: {
    marginBottom: 4,
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    color: theme.colors.text,
  },
  stats: {
    flexDirection: "row",
    gap: 10,
  },
  list: {
    gap: 9,
  },
  empty: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    color: theme.colors.textMuted,
  },
}))
