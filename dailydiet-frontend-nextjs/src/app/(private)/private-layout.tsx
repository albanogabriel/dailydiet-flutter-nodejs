// app/components/PrivateLayout.tsx
import { ReactNode } from "react"
import Header from "../_components/header"

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <div className="private-layout">
      <Header /> {/* Renderiza o header para rotas privadas */}
      <main>{children}</main>
    </div>
  )
}
