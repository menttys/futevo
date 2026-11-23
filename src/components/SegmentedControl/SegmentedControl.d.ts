import type { StyleProp, ViewStyle } from "react-native"

export type SegmentedOption<T extends string | number> = {
  value: T
  label: string
}

export type SegmentedControlProps<T extends string | number> = {
  options: SegmentedOption<T>[]
  value: T
  onChange: (value: T) => void
  style?: StyleProp<ViewStyle>
}
