import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  row: (yellow: boolean, pressed: boolean) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: yellow ? 16 : 14,
    paddingVertical: yellow ? 14 : 12,
    borderRadius: theme.radius.card,
    backgroundColor: yellow ? theme.colors.primary : theme.colors.butter,
    opacity: pressed ? 0.85 : 1,
  }),
  disc: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.onYellow,
  },
  text: {
    flex: 1,
    minWidth: 0,
  },
  name: (yellow: boolean) => ({
    fontFamily: yellow ? theme.fonts.displayBold : theme.fonts.bold,
    fontSize: yellow ? 12.6 : 14,
    letterSpacing: yellow ? -0.25 : 0,
    color: theme.colors.text,
  }),
  subtitle: (yellow: boolean) => ({
    marginTop: yellow ? 5 : 3,
    fontFamily: theme.fonts.regular,
    fontSize: yellow ? 12.5 : 11.5,
    color: yellow ? theme.colors.text : theme.colors.textMuted,
  }),
}))
