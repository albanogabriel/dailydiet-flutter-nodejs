"use client"
// EXPLICAÇÃO -> https://chatgpt.com/share/673e61c5-4acc-800d-9702-749b027c050e

import { useEffect, useState } from "react"
import { Meal } from "../@types/meal"
import { getMealsGroupedByYear } from "../api/get-meals-grouped-by-year"

interface MealWithHour extends Meal {
  hour: string
}
interface GroupedMeal {
  [year: string]: MealWithHour[]
}

export default function MealsTimeline() {
  const [groupedMealsByYear, setGroupedMealsByYear] = useState<GroupedMeal>({})

  const fetchMealsByYear = async () => {
    const data = await getMealsGroupedByYear()
    setGroupedMealsByYear(data)
  }

  useEffect(() => {
    fetchMealsByYear()
  }, [])

  return (
    <div>
      {Object.entries(groupedMealsByYear).map(([year, meals]) => (
        // Object.entries Result - ["2024-11-20": [ { id: 1, nome: "Almoço", data: "2024-11-20", hora: "12:00" }, { id: 2, nome: "Jantar", data: "2024-11-20", hora: "19:00" }]],
        <div key={year}>
          <h2>{year}</h2>
          {meals.map((meal) => (
            <p key={meal.id}>
              {meal.hour}: {meal.name}
            </p>
          ))}
        </div>
      ))}
    </div>
  )
}
