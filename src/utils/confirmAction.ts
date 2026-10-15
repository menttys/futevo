import { Alert } from "react-native"

type ConfirmActionParams = {
  title: string
  message: string
  confirmLabel: string
  onConfirm: () => void
}

export function confirmAction({ title, message, confirmLabel, onConfirm }: ConfirmActionParams) {
  Alert.alert(title, message, [
    { text: "Cancel", style: "cancel" },
    { text: confirmLabel, style: "destructive", onPress: onConfirm },
  ])
}
