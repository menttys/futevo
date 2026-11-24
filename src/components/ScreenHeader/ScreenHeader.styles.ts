import { StyleSheet } from "react-native-unistyles"

import { WEB_CONTENT } from "@/constants/Platform"

export const styles = StyleSheet.create((theme) => ({
  large: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingHorizontal: theme.gutter,
    paddingTop: 4,
    paddingBottom: 14,
  },
  largeTitle: {
    fontFamily: theme.fonts.display,
    fontSize: 25,
    letterSpacing: -0.5,
    color: theme.colors.text,
  },
  back: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: theme.gutter,
    paddingTop: 6,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.wash,
    alignItems: "center",
    justifyContent: "center",
  },
  backTitle: {
    flex: 1,
    fontFamily: theme.fonts.displayBold,
    fontSize: 15.5,
    letterSpacing: -0.3,
    color: theme.colors.text,
  },
  largeWide: {
    alignItems: "flex-end",
  },
  largeTitleWide: {
    fontSize: 28,
    letterSpacing: -0.6,
  },
  backWide: {
    ...WEB_CONTENT,
    gap: 16,
    paddingHorizontal: 44,
    paddingTop: 30,
    paddingBottom: 20,
  },
  backButtonWide: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  backTitleWide: {
    fontFamily: theme.fonts.display,
    fontSize: 21,
    letterSpacing: -0.4,
  },
}))
