"use client"
import Image from "next/image"
import { useAuth } from "../providers/auth-provider"
import { ToggleThemeButton } from "./toggle-theme-button"
import { Power } from "lucide-react"
import useEffectiveTheme from "../hooks/useEffectiveTheme"
import Link from "next/link"

export default function Header() {
  const { logout } = useAuth()
  const { effectiveTheme } = useEffectiveTheme()

  return (
    <div className="container flex justify-between p-6">
      <Link href={"/home"}>
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
      </Link>

      <div className="flex gap-2">
        <ToggleThemeButton />
        <button
          className="flex items-center justify-center gap-2 rounded-lg border border-base700 bg-background p-2 text-foreground hover:border hover:border-red-500 hover:bg-red-500"
          onClick={logout}
        >
          <Power size={16} />
        </button>
      </div>
    </div>
  )
}
