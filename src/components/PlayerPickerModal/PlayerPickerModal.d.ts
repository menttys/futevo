import type { Player } from "@/@types/futevo"

export type PlayerPickerModalProps = {
  visible: boolean
  title?: string
  players: Player[]
  selectedIds: string[]
  max: number
  // Badge label per selected position (e.g. A1, A2, B1, B2).
  slotLabels: string[]
  // Badge color for a selected position.
  slotColor: (index: number) => string
  onChange: (ids: string[]) => void
  onClose: () => void
}
