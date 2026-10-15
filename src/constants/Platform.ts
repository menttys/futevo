import { Platform } from "react-native"

export const IS_WEB = Platform.OS === "web"
export const IS_IOS = Platform.OS === "ios"
export const IS_ANDROID = Platform.OS === "android"
export const IS_NATIVE = !IS_WEB

// react-native-screens' web Screen drops its `style` (absoluteFill) when disabled, which
// collapses every navigator to height 0 — so detaching must stay on for web.
export const DETACH_INACTIVE_SCREENS = IS_WEB
