import * as ImagePicker from "expo-image-picker"

// Returns a local URI (file:// on native, blob: on web) for a square, compressed
// photo, or null if the user cancelled. It is uploaded to Firebase Storage by
// usePlayers().savePlayer — the download URL is what ends up on the player doc.
export async function pickPlayerPhoto(): Promise<string | null> {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.5,
  })
  if (result.canceled) return null
  return result.assets[0]?.uri ?? null
}
