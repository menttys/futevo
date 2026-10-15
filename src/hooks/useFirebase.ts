import { useCallback } from "react"

import type { AuthUser, Match, Player, Tournament } from "@/@types/futevo"
import { Collections } from "@/constants/Collections"
import { db, signInWithGoogle, signOutUser, subscribeToAuth } from "@/lib/firebase"
import { collection, onSnapshot, query, where } from "@/lib/firestore"
import { useMatchStore } from "@/store/matchState"
import { useNetworkStore } from "@/store/networkState"
import { usePlayerStore } from "@/store/playerState"
import { useTournamentStore } from "@/store/tournamentState"
import { useUserStore } from "@/store/userState"

export { db, subscribeToAuth }

// Long-lived Firestore listeners live at module scope rather than component refs:
// useFirebase() is invoked fresh from many components, and refs would spawn a
// duplicate subscription per mounting component instead of sharing one per session.
let playersUnsub: (() => void) | null = null
let matchesUnsub: (() => void) | null = null
let tournamentsUnsub: (() => void) | null = null

function teardownFirestoreListeners() {
  playersUnsub?.()
  playersUnsub = null
  matchesUnsub?.()
  matchesUnsub = null
  tournamentsUnsub?.()
  tournamentsUnsub = null
}

export const signinWithGoogle = signInWithGoogle

export async function signout() {
  teardownFirestoreListeners()
  await signOutUser()
}

const useFirebase = () => {
  const { setUser } = useUserStore()
  const { setPlayers, setIsLoadingPlayers } = usePlayerStore()
  const { setMatches, setIsLoadingMatches } = useMatchStore()
  const { setTournaments, setIsLoadingTournaments } = useTournamentStore()

  // Resolves on the first snapshot (cache-first, works offline) and keeps the
  // listener alive so later writes/reconnects push fresh data automatically.
  const fetchPlayers = useCallback(
    (userId: string) => {
      playersUnsub?.()

      return new Promise<void>((resolve) => {
        playersUnsub = onSnapshot(
          query(collection(db, Collections.PLAYER), where("userId", "==", userId)),
          { includeMetadataChanges: true },
          (snap) => {
            setPlayers(snap.docs.map((d) => ({ ...d.data(), id: d.id })) as Player[])
            useNetworkStore.getState().setHasPendingWrites(snap.metadata.hasPendingWrites)
            resolve()
          },
          (error) => {
            console.error(error)
            setIsLoadingPlayers(false)
            resolve()
          }
        )
      })
    },
    [setPlayers, setIsLoadingPlayers]
  )

  const fetchMatches = useCallback(
    (userId: string) => {
      matchesUnsub?.()

      return new Promise<void>((resolve) => {
        matchesUnsub = onSnapshot(
          query(collection(db, Collections.MATCH), where("userId", "==", userId)),
          { includeMetadataChanges: true },
          (snap) => {
            setMatches(snap.docs.map((d) => ({ ...d.data(), id: d.id })) as Match[])
            useNetworkStore.getState().setHasPendingWrites(snap.metadata.hasPendingWrites)
            resolve()
          },
          (error) => {
            console.error(error)
            setIsLoadingMatches(false)
            resolve()
          }
        )
      })
    },
    [setMatches, setIsLoadingMatches]
  )

  const fetchTournaments = useCallback(
    (userId: string) => {
      tournamentsUnsub?.()

      return new Promise<void>((resolve) => {
        tournamentsUnsub = onSnapshot(
          query(collection(db, Collections.TOURNAMENT), where("userId", "==", userId)),
          { includeMetadataChanges: true },
          (snap) => {
            setTournaments(snap.docs.map((d) => ({ ...d.data(), id: d.id })) as Tournament[])
            useNetworkStore.getState().setHasPendingWrites(snap.metadata.hasPendingWrites)
            resolve()
          },
          (error) => {
            console.error(error)
            setIsLoadingTournaments(false)
            resolve()
          }
        )
      })
    },
    [setTournaments, setIsLoadingTournaments]
  )

  // Firebase Auth's uid is used directly as the owning userId for players/matches —
  // there's no separate profile doc to resolve (no editable profile fields yet),
  // unlike Praeparo's lookup-by-googleUid indirection.
  const fetchUserInfo = useCallback(
    (user: AuthUser) => {
      setUser({
        uid: user.uid,
        id: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      })
      fetchPlayers(user.uid).catch(console.error)
      fetchMatches(user.uid).catch(console.error)
      fetchTournaments(user.uid).catch(console.error)
    },
    [setUser, fetchPlayers, fetchMatches, fetchTournaments]
  )

  return { db, fetchPlayers, fetchMatches, fetchTournaments, fetchUserInfo }
}

export default useFirebase
