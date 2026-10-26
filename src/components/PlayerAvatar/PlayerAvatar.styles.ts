import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  circle: (size: number, selected: boolean) => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: theme.colors.grey700,
    borderWidth: selected ? 3 : 0,
    borderColor: theme.colors.dark,
  }),
  photo: (size: number) => ({
    width: size,
    height: size,
  }),
  initials: (size: number) => ({
    fontFamily: "Figtree_700Bold",
    fontSize: size * 0.4,
    color: theme.colors.dark,
  }),
}))
