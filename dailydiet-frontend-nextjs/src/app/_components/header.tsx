"use client"
import { useAuth } from "../providers/auth-provider"

export default function Header() {
  const { logout } = useAuth()

  return (
    <button className="bg-red-600 text-foreground" onClick={logout}>
      log out
    </button>
  )
}
