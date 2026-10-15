import { Platform } from "react-native"

export const IS_WEB = Platform.OS === "web"
export const IS_IOS = Platform.OS === "ios"
export const IS_ANDROID = Platform.OS === "android"
export const IS_NATIVE = !IS_WEB

// react-native-screens' web Screen drops its `style` (absoluteFill) when disabled, which
// collapses every navigator to height 0 — so detaching must stay on for web.
export const DETACH_INACTIVE_SCREENS = IS_WEB

// Below this viewport width the web tab bar moves to the bottom, like the native app.
export const WEB_SIDE_BAR_MIN_WIDTH = 700

// On wide web viewports content stops growing at this width and is centered in
// the space beside the tab bar instead of stretching edge to edge.
export const WEB_MAX_CONTENT_WIDTH = 1100

// Spread into a scroller's contentContainerStyle: the scene itself stays full width so the
// browser scrollbar sits at the window edge, while the content is centered inside it.
export const WEB_CONTENT = IS_WEB
  ? ({ width: "100%", maxWidth: WEB_MAX_CONTENT_WIDTH, alignSelf: "center" } as const)
  : ({} as const)
