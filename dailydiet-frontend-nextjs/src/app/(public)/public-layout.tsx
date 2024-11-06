// app/components/PublicLayout.tsx
import { ReactNode } from "react"
import { ToggleThemeButton } from "../_components/toggle-theme-button"

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <div className="flex w-full justify-end p-4">
        <ToggleThemeButton />
      </div>
      {children}
    </main>
  )
}
