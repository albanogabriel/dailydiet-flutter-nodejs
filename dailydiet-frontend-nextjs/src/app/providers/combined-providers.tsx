import { ReactNode } from "react"
import AuthProvider from "./auth-provider"
import ThemeProvider from "./theme-provider"

interface CombinedProvidersProps {
  children: ReactNode
}

export default function CombinedProviders({
  children,
}: CombinedProvidersProps) {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  )
}
