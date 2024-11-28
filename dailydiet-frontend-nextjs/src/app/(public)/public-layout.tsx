// app/components/PublicLayout.tsx
import { ReactNode } from "react"

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <main className="flex-1">{children}</main>
}
