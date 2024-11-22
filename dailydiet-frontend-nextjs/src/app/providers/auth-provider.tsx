"use client"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { clientAxios } from "@/lib/axios"
import { toast } from "sonner"

interface AuthContextProps {
  user: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
)

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    const token = Cookies.get("token")
    if (token) setUser("user") // Para um projeto real, use `decode` para obter dados do usuário
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await clientAxios.post("/auth", { email, password })
      Cookies.set("token", response.data.token, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
        path: "/",
      })
      setUser("user")
      toast.success("Successfully login")
      router.push("/home")
    } catch (error) {
      console.error("Erro no login", error)
      toast.error("Login Failed")
    }
  }

  const logout = () => {
    Cookies.remove("token")
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider")
  return context
}
