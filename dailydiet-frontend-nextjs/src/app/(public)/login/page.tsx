"use client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/app/providers/auth-provider"
import { useTheme } from "@/app/providers/theme-provider"

export default function Login() {
  const { login } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const authSchema = z.object({
    email: z
      .string()
      .min(1, "Digite um e-mail válido")
      .email("E-mail obrigatório"),
    password: z.string().min(1, "Senha é obrigatória"),
  })

  type AuthSchema = z.infer<typeof authSchema>

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  })

  const handleLogin = async ({ email, password }: AuthSchema) => {
    try {
      await login(email, password)
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <label htmlFor="theme">Theme:</label>
          <select
            id="theme"
            value={theme}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              toggleTheme(e.target.value)
            }
            className="rounded bg-gray-300 p-2 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            placeholder="albanogabriel@gmail.com"
            className="rounded-md px-2 py-1 text-black md:w-[300px]"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            className="rounded-md px-2 py-1 md:w-[300px]"
            placeholder="@!123asd"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <button type="submit" className="rounded-md bg-white p-2 text-black">
          Login
        </button>
      </div>
    </form>
  )
}
