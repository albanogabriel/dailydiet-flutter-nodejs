import { ReactNode } from "react"
import Header from "../_components/header"

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  )
}
