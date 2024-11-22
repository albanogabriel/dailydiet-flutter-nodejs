"use client"
// EXPLICAÇÃO -> https://chatgpt.com/share/673e61c5-4acc-800d-9702-749b027c050e

import { useEffect, useState } from "react"
import { Meal } from "../@types/meal"
import { getMealsGroupedByYearUsingArray } from "../api/get-meals-grouped-by-year-array"

interface MealWithHour extends Meal {
  hour: string
}
interface GroupedMeal {
  year: string
  meals: MealWithHour[]
}

export default function MealsTimelineWithArray() {
  const [groupedMealsByYear, setGroupedMealsByYear] = useState<GroupedMeal[]>(
    [],
  )

  const fetchMealsByYear = async () => {
    const data = await getMealsGroupedByYearUsingArray()
    setGroupedMealsByYear(data)
  }

  useEffect(() => {
    fetchMealsByYear()
  }, [])

  return (
    <div className="space-y-6">
      {groupedMealsByYear.map(({ year, meals }) => (
        <div key={year} className="space-y-3">
          <h2 className="text-lg font-bold text-base900">{year}</h2>

          <div className="flex flex-col gap-3">
            {meals.map((meal) => (
              <div
                key={meal.id}
                className="flex items-center gap-3 rounded-lg border border-base200 px-3"
              >
                <p className="flex text-xs font-bold">{meal.hour}</p>

                <div className="flex w-full items-center justify-between border-l border-base200 py-3 pl-3 text-base800">
                  <p>{meal.name}</p>
                  <div
                    className={`h-3 w-3 rounded-full ${meal.is_within_diet ? "bg-greenLight" : "bg-red-300"}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
