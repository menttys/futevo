import { StyleSheet } from "react-native-unistyles"

import { theme } from "./theme"

StyleSheet.configure({
  themes: { default: theme },
  settings: { initialTheme: "default" },
})
