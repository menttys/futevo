import React from "react"
import { Text, View } from "react-native"

import { AppButton } from "@/components/AppButton"
import { FutevoMark } from "@/components/FutevoMark"
import { i18n } from "@/i18n"

import { styles } from "./ErrorBoundary.styles"

interface State {
  error: Error | null
}

// "That one got away": a playful upside-down mark, and a way back in.
export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error.message, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <View style={styles.root}>
          <FutevoMark size={56} rotate={180} />
          <Text style={styles.title}>{i18n.t("errors.title")}</Text>
          <Text style={styles.subtitle}>{i18n.t("errors.subtitle")}</Text>
          <Text style={styles.detail} numberOfLines={3}>
            {this.state.error.message}
          </Text>
          <AppButton
            label={i18n.t("errors.retry")}
            labelStyle="body"
            onPress={() => this.setState({ error: null })}
            style={styles.action}
          />
        </View>
      )
    }
    return this.props.children
  }
}
