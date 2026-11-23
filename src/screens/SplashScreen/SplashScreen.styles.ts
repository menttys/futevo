import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  wordmark: {
    marginTop: 12,
    fontFamily: theme.fonts.display,
    fontSize: 37,
    letterSpacing: -0.75,
    color: theme.colors.text,
  },
  tagline: {
    fontFamily: theme.fonts.regular,
    fontSize: 15,
    color: theme.colors.text,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    paddingBottom: Math.max(rt.insets.bottom, 16) + 50,
  },
  dot: (opacity: number) => ({
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: theme.colors.text,
    opacity,
  }),
}))
