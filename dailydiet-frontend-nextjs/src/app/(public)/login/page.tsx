"use client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/app/providers/auth-provider"
import Image from "next/image"

export default function Login() {
  const { login } = useAuth()

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
    <div className="container flex flex-col items-center justify-center">
      <div className="grid max-w-[800px] grid-cols-1 justify-center gap-[32px] rounded-2xl bg-gray-100 lg:grid-cols-2 lg:gap-[0px] lg:shadow-md">
        <aside className="flex flex-col items-center justify-center rounded-l-xl lg:gap-8 lg:bg-gray-200 lg:px-8 lg:py-36">
          <div className="flex items-center justify-center">
            <Image
              src="/barbeacue-man.svg"
              alt=""
              width={200}
              height={200}
              className="scale-[0.55] lg:scale-100"
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-4xl font-bold">Daily Diet App</h1>
            <p className="hidden lg:block">testing pagraph</p>
          </div>
        </aside>
        <main className="flex flex-col items-center justify-center rounded-r-xl lg:p-8">
          <h1 className="mb-8 font-bold">Faça o seu Login</h1>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex w-full flex-col gap-10 lg:w-[400px] lg:justify-center lg:px-8"
          >
            <div className="flex flex-col gap-5">
              <div className="flex w-full flex-wrap gap-2">
                <label htmlFor="email">E-mail:</label>

                <input
                  type="email"
                  placeholder="albanogabriel@gmail.com"
                  className="w-full rounded-md px-2 py-1 text-black"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>

              <div className="flex w-full flex-wrap gap-2">
                <label htmlFor="password">Senha:</label>
                <input
                  type="password"
                  id="password"
                  className="w-full rounded-md px-2 py-1"
                  placeholder="@!123asd"
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="rounded-md bg-foreground p-2 font-semibold text-background"
            >
              Login
            </button>
          </form>
        </main>
      </div>
    </div>
  )
}
