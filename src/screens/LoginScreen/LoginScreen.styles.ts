import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    overflow: "hidden",
  },
  // Giant cropped mark bleeding off the right edge.
  supergraphic: {
    position: "absolute",
    right: -140,
    top: rt.insets.top + 120,
    opacity: 0.12,
  },
  top: {
    paddingTop: rt.insets.top + 10,
    paddingHorizontal: 30,
    gap: 12,
  },
  wordmark: {
    marginTop: 6,
    fontFamily: theme.fonts.display,
    fontSize: 30,
    letterSpacing: -0.6,
    color: theme.colors.text,
  },
  tagline: {
    fontFamily: theme.fonts.regular,
    fontSize: 17,
    lineHeight: 22,
    color: theme.colors.text,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 26,
    paddingBottom: Math.max(rt.insets.bottom, 16) + 18,
    gap: 14,
  },
  google: (pressed: boolean) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    paddingLeft: 13,
    paddingRight: 20,
    borderRadius: theme.radius.full,
    borderWidth: 1.5,
    borderColor: theme.colors.dark,
    backgroundColor: pressed ? theme.colors.washStrong : "transparent",
  }),
  googleDisc: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.dark,
  },
  googleLabel: {
    flex: 1,
    fontFamily: theme.fonts.semibold,
    fontSize: 15,
    color: theme.colors.text,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  languages: {
    flexDirection: "row",
    gap: 4,
  },
  language: (selected: boolean) => ({
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: theme.radius.full,
    backgroundColor: selected ? theme.colors.washStrong : "transparent",
  }),
  languageLabel: {
    fontFamily: theme.fonts.semibold,
    fontSize: 12.5,
    color: theme.colors.text,
  },
  legal: {
    fontFamily: theme.fonts.regular,
    fontSize: 12.5,
    lineHeight: 18,
    color: theme.colors.text,
  },
  legalLink: {
    fontFamily: theme.fonts.semibold,
    textDecorationLine: "underline",
  },
  version: {
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    color: theme.colors.text,
  },
  // desktop web
  wideGrid: {
    flex: 1,
    width: "100%",
    maxWidth: 1208,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 80,
    paddingHorizontal: 44,
  },
  wideBrand: {
    flex: 1,
    gap: 14,
  },
  wideWordmark: {
    marginTop: 16,
    fontFamily: theme.fonts.display,
    fontSize: 65,
    letterSpacing: -1.4,
    color: theme.colors.text,
  },
  wideTagline: {
    fontFamily: theme.fonts.regular,
    fontSize: 26,
    lineHeight: 34,
    color: theme.colors.text,
  },
  wideLanguages: {
    marginTop: 40,
  },
  wideForm: {
    width: 420,
    gap: 18,
  },
  wideTitle: {
    fontFamily: theme.fonts.display,
    fontSize: 21,
    letterSpacing: -0.4,
    color: theme.colors.text,
  },
}))
