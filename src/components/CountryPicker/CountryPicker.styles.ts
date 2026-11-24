import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme, rt) => ({
  label: {
    marginBottom: 6,
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: theme.colors.text,
  },
  // Same wash pill as every other field.
  field: {
    borderRadius: theme.radius.full,
    paddingHorizontal: 18,
    paddingVertical: 13,
    backgroundColor: theme.colors.wash,
  },
  fieldText: {
    fontFamily: theme.fonts.regular,
    fontSize: 15,
    color: theme.colors.text,
  },
  fieldTextEmpty: {
    color: theme.colors.textMuted,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  // The dimmer sits behind the sheet and fades with the open animation.
  scrim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(10,17,31,0.5)",
  },
  sheet: {
    maxHeight: "75%",
    paddingTop: 16,
    paddingHorizontal: theme.gutter,
    paddingBottom: Math.max(rt.insets.bottom, 16),
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  overlayWeb: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.lg,
  },
  floating: {
    width: "100%",
    maxWidth: 420,
    maxHeight: "80%",
    padding: 16,
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.background,
    boxShadow: "0 12px 40px rgba(10,17,31,0.35)",
  },
  search: {
    marginBottom: 8,
    borderRadius: theme.radius.full,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.wash,
    fontFamily: theme.fonts.regular,
    fontSize: 15,
    color: theme.colors.text,
  },
  list: {
    flexGrow: 0,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: theme.radius.md,
  },
  optionActive: {
    backgroundColor: theme.colors.butter,
  },
  optionText: {
    fontFamily: theme.fonts.regular,
    fontSize: 15,
    color: theme.colors.text,
  },
}))
