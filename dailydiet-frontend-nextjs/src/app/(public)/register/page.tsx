"use client"

import { RegisterSchema, registerSchema } from "@/app/schemas/register-schema"
import { clientAxios } from "@/lib/axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function Register() {
  const { push } = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterSchema) => {
    const { confirm_password, ...dataReq } = data

    try {
      const response = await clientAxios.post("/users", dataReq)

      if (response.status === 201) {
        toast.success("Successfully Registered")
        push("/login")
      }
    } catch (error) {
      console.log(error, "erro no login")
      toast.error("Failed to register")
    } finally {
    }
  }

  return (
    <div className="container flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Faça o seu Registro</h1>

      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-[520px] flex-col gap-5"
      >
        {/* name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-semibold text-foreground">
            Nome
          </label>
          <input
            type="text"
            id="name"
            className={`w-full rounded-md border border-base700 bg-base200 px-2 py-1 ${errors.name && "border-red-500"}`}
            placeholder="Ex: Joe doe"
            {...register("name")}
          />
          {errors.name && (
            <div className="text-xs text-red-500">{errors.name.message}</div>
          )}
        </div>

        {/* age */}
        <div className="flex flex-col gap-1">
          <label htmlFor="date" className="font-semibold text-foreground">
            Idade
          </label>
          <input
            type="date"
            id="date"
            className={`w-full rounded-md border border-base700 bg-base200 px-2 py-1 ${errors.age && "border-red-500"}`}
            placeholder="@!123asd"
            {...register("age")}
          />
          {errors.age && (
            <div className="text-xs text-red-500">{errors.age.message}</div>
          )}
        </div>

        {/* E-mail */}
        <div className="flex flex-col gap-1">
          <label htmlFor="e-mail" className="font-semibold text-foreground">
            E-mail
          </label>
          <input
            type="text"
            id="e-mail"
            className={`w-full rounded-md border border-base700 bg-base200 px-2 py-1 ${errors.email && "border-red-500"}`}
            placeholder="joe.doe@gmail.com"
            {...register("email")}
          />
          {errors.email && (
            <div className="text-xs text-red-500">{errors.email.message}</div>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-semibold text-foreground">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`w-full rounded-md border border-base700 bg-base200 px-2 py-1 ${errors.password && "border-red-500"}`}
            placeholder="ex: 123@s955!"
            {...register("password")}
          />
          {errors.password && (
            <div className="text-xs text-red-500">
              {errors.password.message}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="confirm_password"
            className="font-semibold text-foreground"
          >
            Confirmar senha
          </label>
          <input
            type="password"
            id="confirm_password"
            className={`w-full rounded-md border border-base700 bg-base200 px-2 py-1 ${errors.confirm_password && "border-red-500"}`}
            placeholder="ex: 123@s955!"
            {...register("confirm_password")}
          />
        </div>
        {errors.confirm_password && (
          <div className="text-xs text-red-500">
            {errors.confirm_password.message}
          </div>
        )}

        <button
          type="submit"
          className="rounded-md bg-foreground p-2 font-semibold text-background"
        >
          Registrar
        </button>
      </form>
    </div>
  )
}
