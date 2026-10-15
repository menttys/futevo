import type { AppTheme } from "@/styles/theme"

declare module "react-native-unistyles" {
  export interface UnistylesThemes {
    default: AppTheme
  }
}

declare module "*.png" {
  const value: any
  export = value
}

declare module "*.jpg" {
  const value: any
  export = value
}
