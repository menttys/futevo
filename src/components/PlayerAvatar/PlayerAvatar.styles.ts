import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  circle: (size: number, selected: boolean) => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: selected ? 3 : 0,
    borderColor: theme.colors.dark,
  }),
  initials: (size: number) => ({
    fontFamily: "Sora-Bold",
    fontSize: size * 0.4,
    color: theme.colors.dark,
  }),
}))
