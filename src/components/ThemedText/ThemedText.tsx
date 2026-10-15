import { Text } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import type { ThemedTextProps } from "./ThemedText.d"
import { styles } from "./ThemedText.styles"

export function ThemedText({ style, type = "default", color = "text", ...rest }: ThemedTextProps) {
  const { theme } = useUnistyles()
  return (
    <Text
      style={[
        { color: theme.colors[color] as string },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "small" ? styles.small : undefined,
        type === "xSmall" ? styles.xSmall : undefined,
        type === "xSmallBold" ? styles.xSmallBold : undefined,
        style,
      ]}
      {...rest}
    />
  )
}
