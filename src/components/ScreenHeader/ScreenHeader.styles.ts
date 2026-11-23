import { StyleSheet } from "react-native-unistyles"

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
}))
