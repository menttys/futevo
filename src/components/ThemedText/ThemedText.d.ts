import type { TextProps } from "react-native"

import type { AppTheme } from "@/styles/theme"

type StringColorKey = {
  [K in keyof AppTheme["colors"]]: AppTheme["colors"][K] extends string ? K : never
}[keyof AppTheme["colors"]]

export type ThemedTextProps = TextProps & {
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "small"
    | "xSmall"
    | "xSmallBold"
  color?: StringColorKey
}
