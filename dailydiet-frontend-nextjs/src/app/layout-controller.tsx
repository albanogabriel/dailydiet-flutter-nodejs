"use client"

import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import { APP_ROUTES } from "@/middleware"
import PrivateLayout from "./(private)/private-layout"
import PublicLayout from "./(public)/public-layout"

export default function LayoutController({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()

  // Verifica se a rota é privada
  const isPrivateRoute = Object.values(APP_ROUTES.private).includes(pathname)

  // Escolhe o layout com base no tipo de rota
  return isPrivateRoute ? (
    <PrivateLayout>{children}</PrivateLayout>
  ) : (
    <PublicLayout>{children}</PublicLayout>
  )
}
