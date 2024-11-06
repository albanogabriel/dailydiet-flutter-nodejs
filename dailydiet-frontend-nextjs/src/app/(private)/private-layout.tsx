// app/components/PrivateLayout.tsx
import { ReactNode } from "react"
import Header from "../_components/header"
import { ToggleThemeButton } from "../_components/toggle-theme-button"

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <div className="private-layout">
      <ToggleThemeButton />
      <Header /> {/* Renderiza o header para rotas privadas */}
      <main>{children}</main>
    </div>
  )
}
