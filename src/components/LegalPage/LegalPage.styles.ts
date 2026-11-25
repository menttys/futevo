import { StyleSheet } from "react-native-unistyles"

import { IS_WEB, WEB_MAX_CONTENT_WIDTH } from "@/constants/Platform"

export const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 48,
  },
  content: {
    width: "100%",
    maxWidth: WEB_MAX_CONTENT_WIDTH,
    alignSelf: "center",
    paddingHorizontal: theme.gutter,
    gap: 16,
  },
  contentWide: {
    paddingHorizontal: 44,
    gap: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingTop: 18,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  wordmark: {
    fontFamily: theme.fonts.display,
    fontSize: 18,
    letterSpacing: -0.4,
    color: theme.colors.text,
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  back: {
    marginLeft: 8,
    paddingHorizontal: 18,
  },
  tab: (active: boolean) => ({
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: theme.radius.full,
    backgroundColor: active ? theme.colors.card : "transparent",
  }),
  tabLabel: {
    fontFamily: theme.fonts.semibold,
    fontSize: 13.5,
    color: theme.colors.text,
  },
  tabsNarrow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  grid: {
    gap: 16,
  },
  gridWide: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 48,
  },
  sidebar: {
    width: 260,
    alignSelf: "stretch",
  },
  toc: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: theme.radius.card,
    backgroundColor: theme.colors.card,
    boxShadow: theme.shadows.card,
    // Stays in view while the article scrolls (web only).
    ...(IS_WEB ? { position: "sticky" as never, top: 24 } : {}),
  },
  tocLabel: {
    marginBottom: 8,
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: theme.colors.text,
  },
  tocItem: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 5,
  },
  tocNumber: {
    width: 18,
    fontFamily: theme.fonts.semibold,
    fontSize: 13,
    color: theme.colors.textMuted,
  },
  tocText: {
    flex: 1,
    fontFamily: theme.fonts.regular,
    fontSize: 13,
    lineHeight: 17,
    color: theme.colors.textMuted,
  },
  tocDivider: {
    height: 1,
    marginVertical: 12,
    backgroundColor: theme.colors.wash,
  },
  tocOther: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tocOtherLabel: {
    fontFamily: theme.fonts.semibold,
    fontSize: 13.5,
    color: theme.colors.text,
  },
  article: {
    flex: 1,
    width: "100%",
    maxWidth: 720,
    gap: 12,
  },
  eyebrow: {
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: theme.colors.textMuted,
  },
  title: {
    fontFamily: theme.fonts.display,
    fontSize: 26,
    letterSpacing: -0.6,
    color: theme.colors.text,
  },
  titleWide: {
    fontSize: 32,
  },
  intro: {
    fontFamily: theme.fonts.regular,
    fontSize: 18,
    lineHeight: 27,
    color: theme.colors.text,
  },
  notice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 14,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.softYellow,
  },
  noticeText: {
    flex: 1,
    fontFamily: theme.fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    color: theme.colors.text,
  },
  section: {
    marginTop: 14,
    gap: 10,
  },
  sectionHead: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10,
  },
  sectionNumber: {
    fontFamily: theme.fonts.displayBold,
    fontSize: 13,
    color: theme.colors.textMuted,
  },
  sectionTitle: {
    flex: 1,
    fontFamily: theme.fonts.displayBold,
    fontSize: 15,
    letterSpacing: -0.3,
    color: theme.colors.text,
  },
  paragraph: {
    fontFamily: theme.fonts.regular,
    fontSize: 15.5,
    lineHeight: 25.5,
    color: theme.colors.text,
  },
  placeholder: {
    backgroundColor: theme.colors.softYellow,
  },
  list: {
    gap: 8,
  },
  listItem: {
    flexDirection: "row",
    gap: 10,
    paddingLeft: 6,
  },
  bullet: {
    fontFamily: theme.fonts.regular,
    fontSize: 15.5,
    lineHeight: 25.5,
    color: theme.colors.text,
  },
  listText: {
    flex: 1,
  },
  footer: {
    marginTop: 28,
    paddingTop: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.wash,
  },
  footerLink: {
    fontFamily: theme.fonts.semibold,
    fontSize: 13.5,
    color: theme.colors.text,
  },
  footerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },
  footerLanguages: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  footerText: {
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    color: theme.colors.textMuted,
  },
  footerActive: {
    fontFamily: theme.fonts.semibold,
    color: theme.colors.text,
  },
}))
