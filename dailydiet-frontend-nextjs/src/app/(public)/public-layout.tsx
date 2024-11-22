// app/components/PublicLayout.tsx
import { ReactNode } from "react"
import { ToggleThemeButton } from "../_components/toggle-theme-button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PublicLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  return (
    <main>
      <div className="flex w-full items-center justify-between p-4 lg:justify-end">
        <ArrowLeft onClick={() => router.back()} className="lg:hidden" />
        <ToggleThemeButton />
      </div>
      {children}
    </main>
  )
}
