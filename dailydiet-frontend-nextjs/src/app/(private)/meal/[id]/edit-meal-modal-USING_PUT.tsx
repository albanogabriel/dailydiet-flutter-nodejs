import { Meal } from "@/app/@types/meal"
import { editMeal } from "@/app/api/edit-meal"
import { editMealSchema, EditMealSchemaType } from "@/app/schemas/edit-meal"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { useForm } from "react-hook-form"

interface EditMealModal {
  data: Meal
  mealId: string
  closeModal: () => void
}

export default function EditMealModal({
  data,
  mealId,
  closeModal,
}: EditMealModal) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EditMealSchemaType>({
    resolver: zodResolver(editMealSchema),
  })

  const isWithinDiet = watch("is_within_diet")

  //

  const fetchEditMeal = async (editData: EditMealSchemaType) => {
    try {
      // Filtrar propriedades não preenchidas e mesclar com os valores originais
      const dataWithOriginalValues = {
        ...data, // valores originais da refeição
        ...editData, // valores modificados (editados no formulário)
      }

      // Agora, qualquer campo vazio no editData será substituído pelo valor original em 'data'

      const { date, time, ...rest } = dataWithOriginalValues

      const originDate = new Date(data.date_time)
      const originFormattedDate = originDate.toISOString().split("T")[0] // Formata como 'YYYY-MM-DD'
      const originFormattedTime = originDate.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })

      // Montar `date_time` de acordo com as condições
      let date_time: string | undefined

      if (date && time) {
        date_time = `${date}T${time}`
      } else if (date) {
        // apenas date
        date_time = `${date}T${originFormattedTime}`
      } else if (time) {
        // apenas time
        date_time = `${originFormattedDate}T${time}`
      }

      // Montar o objeto final para envio
      const objectToSend = {
        ...rest,
        ...(date_time && { date_time }),
      }

      // Enviar todos os dados usando PUT
      await editMeal({
        mealId,
        data: objectToSend,
      })
    } catch (error) {
      console.error("Erro ao atualizar refeição:", error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/75">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{
          type: "tween", // Tipo de transição linear
          duration: 0.2, // Tempo da animação (ajustável conforme necessidade)
          ease: "easeOut", // Controla a suavidade (experimente 'easeOut' para suavizar a chegada)
        }}
        className="absolute bottom-0 left-0 right-0 top-[10%] z-10 rounded-t-3xl bg-base100"
      >
        <form
          onSubmit={handleSubmit(fetchEditMeal)}
          className="relative flex h-full w-full flex-col justify-between gap-4 px-8 py-16"
        >
          <X
            onClick={closeModal}
            className="absolute right-4 top-4 cursor-pointer text-foreground"
          />

          <div className="flex flex-col gap-6">
            {/* NOME INPUT*/}
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-bold text-base800">
                Nome
              </label>
              <input
                {...register("name")}
                className="w-full rounded-md border border-base200 p-2"
              />
              {errors.name && (
                <div className="text-xs text-red-500">
                  {errors.name.message}
                </div>
              )}
            </div>

            {/* DESCRIÇÃO INPUT */}
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-bold text-base800">
                Descrição
              </label>
              <textarea
                {...register("description")}
                className="h-24 w-full resize-none rounded-md border border-base200 p-2"
              />
              {errors.description && (
                <div className="text-xs text-red-500">
                  {errors.description.message}
                </div>
              )}
            </div>

            <div className="flex gap-4">
              {/* INPUTS DE DATA E HORA */}
              <div className="flex gap-4">
                {/* DATE INPUT */}
                <div className="flex w-full flex-col gap-2 text-base800">
                  <label htmlFor="date" className="font-bold">
                    Data
                  </label>
                  <input
                    id="date"
                    type="date"
                    {...register("date", { required: "Data é obrigatória" })}
                    className="w-full rounded-md border border-base200 p-2 text-base300"
                  />
                  {errors.date && (
                    <div className="text-xs text-red-500">
                      {errors.date.message}
                    </div>
                  )}
                </div>

                {/* TIME INPUT */}
                <div className="flex w-full flex-col gap-2">
                  <label htmlFor="time" className="font-bold">
                    Hora
                  </label>
                  <input
                    id="time"
                    type="time"
                    {...register("time", { required: "Hora é obrigatória" })}
                    className="w-full rounded-md border border-base200 p-2 text-base300"
                  />
                  {errors.time && (
                    <div className="text-xs text-red-500">
                      {errors.time.message}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="flex w-full gap-4">
                <button
                  className={`text-base500 flex w-full items-center justify-center gap-2 rounded-md border-2 px-4 py-3 ${
                    isWithinDiet === true
                      ? "border-green-200 bg-green-100 text-black/70"
                      : "border-base150 bg-base150"
                  }`}
                  type="button"
                  onClick={() => setValue("is_within_diet", true)}
                >
                  {isWithinDiet === true && (
                    <span className="h-2 w-2 rounded-full bg-greenDark"></span>
                  )}
                  Sim
                </button>
                <button
                  className={`text-base500 flex w-full items-center justify-center gap-2 rounded-md border-2 px-4 py-3 ${
                    isWithinDiet === false
                      ? "border-red-200 bg-red-100 text-black/70"
                      : "border-base150 bg-base150"
                  }`}
                  type="button"
                  onClick={() => setValue("is_within_diet", false)}
                >
                  {isWithinDiet === false && (
                    <span className="h-2 w-2 rounded-full bg-red-800"></span>
                  )}
                  Não
                </button>
              </div>
              {errors.is_within_diet && (
                <div className="text-xs text-red-500">
                  {errors.is_within_diet.message}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="rounded-md bg-foreground p-4 font-semibold text-background"
          >
            Salvar Alterações
          </button>
        </form>
      </motion.div>
    </div>
  )
}
