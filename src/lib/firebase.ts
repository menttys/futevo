import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "@react-native-firebase/auth"
import { getFirestore } from "@react-native-firebase/firestore"
import { GoogleSignin } from "@react-native-google-signin/google-signin"

import type { AuthUser } from "@/@types/futevo"

const auth = getAuth()
export const db = getFirestore()

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
})

export function subscribeToAuth(callback: (user: AuthUser | null) => void): () => void {
  return onAuthStateChanged(auth, callback)
}

export async function signInWithGoogle(): Promise<void> {
  const result = await GoogleSignin.signIn()
  if (result.type !== "success" || !result.data.idToken) return
  const credential = GoogleAuthProvider.credential(result.data.idToken)
  await signInWithCredential(auth, credential)
}

export async function signOutUser(): Promise<void> {
  await signOut(auth)
}
