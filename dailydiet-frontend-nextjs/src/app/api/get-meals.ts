import { clientAxios } from "@/lib/axios"
import axios from "axios"

export const getMeals = async () => {
  try {
    const response = await clientAxios.get("/meals")
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro na API:", error.response?.data || error.message)
      throw new Error(
        error.response?.data?.message || "Erro ao buscar refeições",
      )
    }
    throw new Error("Erro inesperado")
  }
}
