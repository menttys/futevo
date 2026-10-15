type ConfirmActionParams = {
  title: string
  message: string
  confirmLabel: string
  onConfirm: () => void
}

// react-native-web's Alert.alert is a no-op, so use the browser's native confirm.
export function confirmAction({ title, message, onConfirm }: ConfirmActionParams) {
  if (window.confirm(`${title}\n\n${message}`)) onConfirm()
}
