import { z } from "zod"

export const registerSchema = z
  .object({
    name: z.string().min(3, "Seu nome precisa ter mais de 3 dígitos"),
    age: z.string().min(1, "Insira uma data válida"),
    email: z.string().email(),
    password: z.string().min(8, { message: "Mínimo 8 digitos" }),
    confirm_password: z.string().min(8, { message: "Mínimo 8 digitos" }),
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "As senhas precisam ser iguais.",
    path: ["confirm_password"],
  })

export type RegisterSchema = z.infer<typeof registerSchema>
