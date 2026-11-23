import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flexShrink: 1,
  },
  content: {
    paddingHorizontal: theme.gutter,
    paddingBottom: 12,
    gap: 14,
  },
  // Dashed photo target (camera or library).
  photo: {
    alignSelf: "center",
    width: 112,
    height: 112,
    borderRadius: 56,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    overflow: "hidden",
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: theme.colors.text,
    backgroundColor: theme.colors.wash,
  },
  photoImage: {
    width: "100%",
    height: "100%",
  },
  photoLabel: {
    fontFamily: theme.fonts.semibold,
    fontSize: 12,
    color: theme.colors.text,
  },
  label: {
    marginBottom: 6,
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: theme.colors.text,
  },
  input: {
    borderRadius: theme.radius.full,
    paddingHorizontal: 18,
    paddingVertical: 13,
    backgroundColor: theme.colors.wash,
    fontFamily: theme.fonts.regular,
    fontSize: 15,
    color: theme.colors.text,
  },
  footer: {
    paddingHorizontal: theme.gutter,
    paddingTop: 8,
    paddingBottom: Math.max(rt.insets.bottom, 16) + 6,
  },
  submit: {
    minHeight: 52,
  },
}))
