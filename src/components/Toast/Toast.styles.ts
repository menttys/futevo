import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 200,
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
  },
  toast: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.full,
    paddingVertical: 12,
    paddingHorizontal: 18,
    boxShadow: theme.shadows.bar,
  },
  text: {
    fontFamily: theme.fonts.semibold,
    fontSize: 14,
    color: theme.colors.text,
    textAlign: "center",
  },
}))
