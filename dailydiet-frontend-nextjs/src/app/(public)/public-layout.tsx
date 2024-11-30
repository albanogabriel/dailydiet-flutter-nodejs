// app/components/PublicLayout.tsx
import { ReactNode } from "react"
import { ToggleThemeButton } from "../_components/toggle-theme-button"
import useEffectiveTheme from "../hooks/useEffectiveTheme"
import Image from "next/image"

export default function PublicLayout({ children }: { children: ReactNode }) {
  const { effectiveTheme } = useEffectiveTheme()
  return (
    <>
      <div className="container flex justify-between p-6">
        <Image
          src={
            effectiveTheme === "dark"
              ? "/daily-diet-white.svg"
              : "/daily-diet-black.svg"
          }
          width={82}
          height={37}
          alt="logo-black"
        />

        <div className="flex gap-2">
          <ToggleThemeButton />
        </div>
      </div>
      <main className="flex-1">{children}</main>
    </>
  )
}
