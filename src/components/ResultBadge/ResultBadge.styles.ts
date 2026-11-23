import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  badge: (win: boolean, size: number) => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: win ? theme.colors.butter : theme.colors.stone,
  }),
  label: {
    fontFamily: theme.fonts.displayBold,
    fontSize: 10.7,
    color: theme.colors.text,
  },
}))
