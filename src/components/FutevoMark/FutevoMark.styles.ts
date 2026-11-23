import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create(() => ({
  mark: (size: number, rotate: number) => ({
    width: size,
    height: size * MARK_RATIO,
    transform: [{ rotate: `${rotate}deg` }],
  }),
}))

// The mark's viewBox is 81 × 79.137.
export const MARK_RATIO = 79.137 / 81
