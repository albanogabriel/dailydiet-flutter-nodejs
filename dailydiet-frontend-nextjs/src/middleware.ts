// Object.values() -> list a object { dashboad: '/dashboard' , login: '/login:} as itens -> // Object.values(APP_ROUTES.private) = [ "/dashboard", "/home", "/meals" ... ]

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const APP_ROUTES = {
  private: {
    home: "/home",
    overview: "/overview",
  },
  public: {
    login: "/login",
    register: "/cadastro",
    forgetPassword: "/esqueci-senha",
    newPassword: "/nova-senha",
  },
}

export default function authMiddleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const isAuthPage = request.nextUrl.pathname === APP_ROUTES.public.login
  const isProtectedRoute = Object.values(APP_ROUTES.private).includes(
    request.nextUrl.pathname,
  )

  // Redirect unauthenticated users from protected routes to the login page
  if (isProtectedRoute && !token) {
    const loginUrl = new URL(APP_ROUTES.public.login, request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users away from the login page to the home page
  if (isAuthPage && token) {
    const homeUrl = new URL(APP_ROUTES.private.home, request.url)
    return NextResponse.redirect(homeUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [...Object.values(APP_ROUTES.private), APP_ROUTES.public.login],
}

// orignal middleware.ts

// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"

// export default function authMiddleware(request: NextRequest) {
//   const token = request.cookies.get("token")?.value
//   const isAuthPage = request.nextUrl.pathname === "/login"
//   const isProtectedRoute = ["/home", "/dashboard", "/meals"].includes(
//     request.nextUrl.pathname,
//   )

//   // Redirect unauthenticated users from protected routes to the login page
//   if (isProtectedRoute && !token) {
//     const loginUrl = new URL("/login", request.url)
//     return NextResponse.redirect(loginUrl)
//   }

//   // Redirect authenticated users away from the login page to the home page
//   if (isAuthPage && token) {
//     const homeUrl = new URL("/home", request.url)
//     return NextResponse.redirect(homeUrl)
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ["/home", "/dashboard", "/meals", "/login"],
// }
