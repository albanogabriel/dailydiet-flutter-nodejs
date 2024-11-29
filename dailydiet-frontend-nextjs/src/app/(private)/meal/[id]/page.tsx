"use client"

import { Meal } from "@/app/@types/meal"
import { getMealById } from "@/app/api/get-meal-by-id"
import { Pencil, Trash } from "lucide-react"
import { useState, useEffect } from "react"
import DeleteMealModal from "./delete-meal-modal"
import EditMealModal from "./edit-meal-modal"

interface Params {
  params: {
    id: string
  }
}

export default function MealById({ params }: Params) {
  const [meal, setMeal] = useState<Meal | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const fetchMealById = async () => {
    const data = await getMealById(params.id)
    setMeal(data)
  }

  useEffect(() => {
    fetchMealById()
  }, [])

  if (!meal) {
    return null
  }

  return (
    <>
      <div
        className={`flex h-full w-full flex-col ${
          meal?.is_within_diet ? "bg-greenMid" : "bg-red-300"
        }`}
      >
        {/* Header */}
        <div className="flex w-full justify-center px-2 py-10 text-black/90">
          <span className="text-4 font-bold">Refeição</span>
        </div>

        {/* Content */}
        <div className="flex h-full flex-col justify-between overflow-y-auto rounded-t-3xl bg-base100 px-6 py-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold">
                {meal.name.charAt(0).toUpperCase() + meal.name.slice(1)}
              </h3>
              <p className="text-xl text-base700">
                {meal.name.charAt(0).toUpperCase() + meal.name.slice(1)}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold">Data e hora</h3>
              <p className="text-base text-base700">{meal.description}</p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-3xl bg-base150 px-4 py-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  meal.is_within_diet ? "bg-green-500" : "bg-red-300"
                }`}
              ></div>
              {meal.is_within_diet ? "Dentro da dieta" : "Fora da Dieta"}
            </div>
          </div>

          <div className="flex flex-col gap-4 py-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-base800 px-6 py-4 text-base150"
            >
              <Pencil size={14} />
              Editar Refeição
            </button>

            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="hover:text- flex w-full items-center justify-center gap-2 rounded-md border border-base800 bg-base100 px-6 py-4 text-base800 hover:border-red-700/70 hover:bg-red-700/80 hover:text-base100"
            >
              <Trash size={14} />
              Excluir
            </button>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <EditMealModal
          data={meal}
          mealId={meal.id}
          closeModal={() => setIsEditModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteMealModal
          mealId={meal.id}
          closeModal={() => setIsDeleteModalOpen(false)}
        />
      )}
    </>
  )
}
