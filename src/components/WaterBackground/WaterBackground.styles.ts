import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create(() => ({
  container: (height: number) => ({
    width: "100%",
    height,
    overflow: "hidden",
  }),
}))
