import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme, rt) => ({
  wrapper: {
    paddingHorizontal: 16,
    // The centre ball rises 24px above the bar.
    paddingTop: 30,
    paddingBottom: Math.max(rt.insets.bottom - 8, 12),
    backgroundColor: "transparent",
  },
  // The bottom bar overlays the screen so content scrolls underneath it.
  wrapperFloating: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  wrapperSide: {
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 12,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    maxWidth: 460,
    height: 64,
    paddingHorizontal: 10,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    boxShadow: theme.shadows.bar,
  },
  barSide: {
    flexDirection: "column",
    width: 84,
    height: undefined,
    paddingHorizontal: 0,
    paddingVertical: 14,
    gap: 6,
    borderRadius: 42,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingVertical: 7,
    borderRadius: theme.radius.full,
  },
  itemSide: {
    flex: 0,
    width: "100%",
    paddingVertical: 10,
  },
  label: (focused: boolean) => ({
    fontFamily: focused ? theme.fonts.bold : theme.fonts.semibold,
    fontSize: 10,
    letterSpacing: 0.4,
    color: focused ? theme.colors.text : theme.colors.iconMuted,
  }),
  // New match: a yellow ball carrying the mark, ringed in the page colour.
  ball: {
    width: 72,
    height: 72,
    marginTop: -30,
    marginHorizontal: -2,
    borderRadius: 36,
    borderWidth: 6,
    borderColor: theme.colors.background,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  ballSide: {
    marginTop: 4,
    marginBottom: 4,
    marginHorizontal: 0,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 12,
    padding: 10,
    backgroundColor: theme.colors.dark,
    boxShadow: theme.shadows.card,
  },
  logoImage: {
    width: "100%",
    height: "100%",
    borderRadius: 22,
  },
}))
