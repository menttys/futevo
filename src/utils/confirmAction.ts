import { Alert } from "react-native"

import { i18n } from "@/i18n"

type ConfirmActionParams = {
  title: string
  message: string
  confirmLabel: string
  onConfirm: () => void
}

export function confirmAction({ title, message, confirmLabel, onConfirm }: ConfirmActionParams) {
  Alert.alert(title, message, [
    { text: i18n.t("common.cancel"), style: "cancel" },
    { text: confirmLabel, style: "destructive", onPress: onConfirm },
  ])
}
