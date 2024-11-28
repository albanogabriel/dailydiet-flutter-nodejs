import { clientAxios } from "@/lib/axios"
import axios from "axios"

export const deleteMeal = async (mealId: string) => {
  try {
    const response = await clientAxios.delete(`/meals/${mealId}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro na API:", error.response?.data || error.message)
      throw new Error(error.response?.data?.message || "Erro ao criar refeição")
    }
    throw new Error("Erro inesperado")
  }
}
