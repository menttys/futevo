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
  version: {
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    color: theme.colors.text,
  },
}))
