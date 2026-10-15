import { useCallback } from "react"

import type { Player } from "@/@types/futevo"
import { Collections } from "@/constants/Collections"
import { db } from "@/hooks/useFirebase"
import { deleteDoc, doc, setDoc } from "@/lib/firestore"
import { usePlayerStore } from "@/store/playerState"
import { useUserStore } from "@/store/userState"
import { generateDocId } from "@/utils/generateDocId"
import { stripUndefined } from "@/utils/stripUndefined"

export const usePlayers = () => {
  const userId = useUserStore((s) => s.user?.id)

  // Writes patch the store first and never block on the network — the native SDK
  // queues them offline and the useFirebase() listener reconciles once they land.
  const savePlayer = useCallback(
    (player: { id?: string; name: string; color?: string }): string => {
      const id = player.id ?? generateDocId(Collections.PLAYER)
      const payload = stripUndefined<Player>({
        id,
        userId: userId ?? "",
        name: player.name,
        color: player.color,
      })

      usePlayerStore.getState().upsertPlayer(payload)
      setDoc(doc(db, Collections.PLAYER, id), payload, { merge: true }).catch(console.error)

      return id
    },
    [userId]
  )

  const deletePlayer = useCallback((playerId: string): void => {
    usePlayerStore.getState().removePlayer(playerId)
    deleteDoc(doc(db, Collections.PLAYER, playerId)).catch(console.error)
  }, [])

  return { savePlayer, deletePlayer }
}
