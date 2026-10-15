import React from "react"
import { Text, View } from "react-native"

interface State {
  error: Error | null
}

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
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
          <Text style={{ color: "red", fontWeight: "bold", marginBottom: 8 }}>Crash caught:</Text>
          <Text style={{ color: "red" }}>{this.state.error.message}</Text>
        </View>
      )
    }
    return this.props.children
  }
}
