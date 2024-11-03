// app/components/PublicLayout.tsx
import { ReactNode } from "react"

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="public-layout">
      <main>{children}</main>
    </div>
  )
}
