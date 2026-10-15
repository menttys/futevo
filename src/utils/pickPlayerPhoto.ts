import * as ImagePicker from "expo-image-picker"

// Firebase Storage isn't configured in this project, so the photo is stored on the
// player document itself: a small, square, compressed data URI keeps it durable on
// web (blob: URIs die with the tab) and well below Firestore's 1 MiB document limit.
export async function pickPlayerPhoto(): Promise<string | null> {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.3,
    base64: true,
  })
  if (result.canceled) return null
  const asset = result.assets[0]
  if (!asset) return null
  if (asset.base64) return `data:${asset.mimeType ?? "image/jpeg"};base64,${asset.base64}`
  return asset.uri
}
