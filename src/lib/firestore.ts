// Native Firestore bindings. The web build swaps this for firestore.web.ts, which
// re-exports the same modular API from the Firebase JS SDK.
export {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "@react-native-firebase/firestore"
