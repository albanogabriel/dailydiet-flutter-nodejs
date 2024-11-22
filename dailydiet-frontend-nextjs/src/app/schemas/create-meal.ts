import { z } from "zod"

export const createMealSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  description: z.string().optional(),
  date: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "Data inválida",
  }),
  time: z.string().refine(
    (value) => {
      const [hours, minutes] = value.split(":").map(Number)
      return (
        Number.isInteger(hours) &&
        Number.isInteger(minutes) &&
        hours >= 0 &&
        hours < 24 &&
        minutes >= 0 &&
        minutes < 60
      )
    },
    { message: "Hora inválida" },
  ),
  is_within_diet: z.boolean({ message: "Deve ser um valor booleano" }),
})

export type CreateMealSchemaType = z.infer<typeof createMealSchema>

// Explicação
// Validação do campo date:

// Usa Date.parse para verificar se a string pode ser convertida em uma data válida.
// A validação passa se a string representar uma data no formato esperado (YYYY-MM-DD).
// Validação do campo time:

// A string time é dividida em horas e minutos usando split(":").
// Cada parte é convertida para número com Number.
// Verifica se as horas estão entre 0 e 23 e os minutos entre 0 e 59.
// Sem regex:

// As validações são feitas usando métodos nativos de manipulação de strings e números, eliminando a necessidade de regex.
