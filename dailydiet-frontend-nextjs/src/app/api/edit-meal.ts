import { clientAxios } from "@/lib/axios"
import axios from "axios"

interface EditMealProps {
  mealId: string
  data: {
    name?: string
    description?: string
    date_time?: string
    is_within_diet?: boolean
  }
}

export const editMeal = async ({ mealId, data }: EditMealProps) => {
  try {
    const response = await clientAxios.patch(`/meals/${mealId}`, data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro na API:", error.response?.data || error.message)
      throw new Error(error.response?.data?.message || "Erro ao criar refeição")
    }
    throw new Error("Erro inesperado")
  }
}
