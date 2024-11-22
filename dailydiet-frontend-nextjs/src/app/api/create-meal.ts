import { clientAxios } from "@/lib/axios"
import axios from "axios"

interface CreateMealType {
  name: string
  date_time: string
  description?: string
  is_within_diet: boolean
}

// POST - CREATE MEAL
export const createMeal = async (data: CreateMealType) => {
  try {
    const response = await clientAxios.post("/meals", data)
    console.log("teste", response.data)
    return response.data // Retorna apenas os dados úteis
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro na API:", error.response?.data || error.message)
      throw new Error(error.response?.data?.message || "Erro ao criar refeição")
    }
    throw new Error("Erro inesperado")
  }
}
