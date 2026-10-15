import type { AttackTypeId } from "@/@types/futevo"

export type AttackTypePickerProps = {
  selected?: AttackTypeId
  onSelect: (attackType: AttackTypeId) => void
}
