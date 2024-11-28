"use client"

import { usePathname } from "next/navigation"

import { APP_ROUTES } from "@/middleware"
import PrivateLayout from "./(private)/private-layout"
import PublicLayout from "./(public)/public-layout"
import { ReactNode } from "react"

export default function LayoutController({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()

  const isPrivateRoute = Object.values(APP_ROUTES.private).some((route) => {
    if (route.includes("/:")) {
      // Trata rotas dinâmicas, como /meal/:id
      const baseRoute = route.split("/:")[0]
      return pathname.startsWith(baseRoute)
    }
    return pathname === route
  })

  return (
    // Escolhe o layout com base no tipo de rota
    <>
      {isPrivateRoute ? (
        <PrivateLayout>{children}</PrivateLayout>
      ) : (
        <PublicLayout>{children}</PublicLayout>
      )}
    </>
  )
}
