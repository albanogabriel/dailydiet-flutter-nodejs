"use client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/app/providers/auth-provider"
import Image from "next/image"
import Link from "next/link"
import useEffectiveTheme from "@/app/hooks/useEffectiveTheme"

export default function Login() {
  const { login } = useAuth()
  const { effectiveTheme } = useEffectiveTheme()

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
    <div className="container mt-10 flex flex-col items-center justify-center">
      <div className="grid w-full max-w-[1100px] grid-cols-1 items-center justify-center rounded-2xl bg-base100 lg:grid-cols-2 lg:gap-[0px] lg:shadow-md">
        <aside className="hidden flex-col items-center justify-center rounded-t-lg bg-base150 p-12 lg:flex lg:gap-8 lg:rounded-l-xl lg:rounded-r-none lg:py-36">
          <div className="flex items-center justify-center">
            <Image
              src="/barbeacue-man.svg"
              alt=""
              width={160}
              height={160}
              className="scale-[0.55] lg:scale-100"
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-4xl font-bold">Daily Diet App</h1>
            <p className="hidden lg:block">testing pagraph</p>
          </div>
        </aside>
        <main className="flex flex-col items-center justify-center gap-8 rounded-xl bg-base100 px-8 py-14 lg:gap-4 lg:rounded-r-xl lg:p-8">
          <Image
            src={
              effectiveTheme === "dark"
                ? "/daily-diet-white.svg"
                : "/daily-diet-black.svg"
            }
            width={70}
            height={70}
            alt=""
            className="hidden lg:block"
          />

          <div className="flex items-center justify-center">
            <Image
              src="/barbeacue-man.svg"
              alt=""
              width={160}
              height={160}
              className="scale-[0.55] lg:hidden lg:scale-100"
            />
          </div>
          <h1 className="mb-8 font-bold">Olá! Faça o seu Login</h1>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex w-full max-w-[400px] flex-col gap-10 lg:justify-center lg:px-8"
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

          <div className="text-sm">
            Novo por aqui ?{" "}
            <Link href={"/register"} className="text-hyperlink">
              Registre-se
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
