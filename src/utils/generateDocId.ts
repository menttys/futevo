import { Collections } from "@/constants/Collections"
import { db } from "@/hooks/useFirebase"
import { collection, doc } from "@/lib/firestore"

// Firestore always generates document IDs client-side (addDoc does exactly this
// internally), so this resolves synchronously even offline — letting callers patch
// local state with the final id before the network write resolves or queues.
export function generateDocId(collectionName: Collections): string {
  return doc(collection(db, collectionName)).id
}
