import { useCallback } from "react"

import type { Player } from "@/@types/futevo"
import { Collections } from "@/constants/Collections"
import { db } from "@/hooks/useFirebase"
import { deleteDoc, doc, setDoc } from "@/lib/firestore"
import { deleteFile, uploadFile } from "@/lib/storage"
import { usePlayerStore } from "@/store/playerState"
import { useUserStore } from "@/store/userState"
import { capitalizeName } from "@/utils/capitalizeName"
import { generateDocId } from "@/utils/generateDocId"
import { isLocalPhotoUri, playerPhotoPath } from "@/utils/playerPhotoPath"
import { stripUndefined } from "@/utils/stripUndefined"

export const usePlayers = () => {
  const userId = useUserStore((s) => s.user?.id)

  // Writes patch the store first and never block on the network — the native SDK
  // queues them offline and the useFirebase() listener reconciles once they land.
  const savePlayer = useCallback(
    (player: {
      id?: string
      name: string
      color?: string
      photoUri?: string
      birthCountry?: string
      residencyCountry?: string
    }): string => {
      const id = player.id ?? generateDocId(Collections.PLAYER)
      const payload = stripUndefined<Player>({
        id,
        userId: userId ?? "",
        name: capitalizeName(player.name.trim()),
        color: player.color,
        photoUri: player.photoUri,
        birthCountry: player.birthCountry,
        residencyCountry: player.residencyCountry,
      })

      usePlayerStore.getState().upsertPlayer(payload)
      const write = (data: Player) =>
        setDoc(doc(db, Collections.PLAYER, id), data, { merge: true }).catch(console.error)

      if (userId && isLocalPhotoUri(player.photoUri)) {
        // The local URI shows immediately; once the upload lands the doc (and the
        // store, via the listener) switch to the permanent download URL.
        uploadFile(playerPhotoPath(userId, id), player.photoUri)
          .then((url) => {
            const uploaded = { ...payload, photoUri: url }
            usePlayerStore.getState().upsertPlayer(uploaded)
            return write(uploaded)
          })
          .catch((error) => {
            console.error(error)
            // Don't persist a device-local path that no other device can load.
            return write(stripUndefined<Player>({ ...payload, photoUri: undefined }))
          })
      } else {
        write(payload)
        // Photo removed from an existing player: drop the stored object too.
        if (userId && player.id && player.photoUri === "") {
          deleteFile(playerPhotoPath(userId, id)).catch(() => {})
        }
      }

      return id
    },
    [userId]
  )

  const deletePlayer = useCallback(
    (playerId: string): void => {
      usePlayerStore.getState().removePlayer(playerId)
      deleteDoc(doc(db, Collections.PLAYER, playerId)).catch(console.error)
      if (userId) deleteFile(playerPhotoPath(userId, playerId)).catch(() => {})
    },
    [userId]
  )

  return { savePlayer, deletePlayer }
}
