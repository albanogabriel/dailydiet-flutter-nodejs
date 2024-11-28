"use client"

import { Stats } from "@/app/@types/stats"
import { getMealStats } from "@/app/api/get-meals-stats"
import { useEffect, useState } from "react"

export default function OverView() {
  const [stats, setStats] = useState<Stats>({
    withinDiet: 0,
    outsideDiet: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalMeals: 0,
  })

  const fetchMeals = async () => {
    const data = await getMealStats()
    setStats(data)
  }

  useEffect(() => {
    fetchMeals()
  }, [])

  const mealPercentageWithinDiet =
    stats.totalMeals > 0 ? (stats.withinDiet * 100) / stats.totalMeals : 0

  return (
    <div
      className={`flex h-full w-full flex-col ${
        mealPercentageWithinDiet >= 50 ? "bg-greenMid" : "bg-red-300"
      }`}
    >
      {/* PERCENTAGE CARD */}
      <div
        className={`flex w-full flex-col items-center justify-center px-2 py-10`}
      >
        <span className="text-3xl font-bold leading-[130%] text-black">
          {`${mealPercentageWithinDiet.toFixed(2)}%`}
        </span>
        <p className="text-black">das refeições dentro da dieta</p>
      </div>

      <div className="flex h-full flex-col items-center gap-8 rounded-t-3xl bg-base100 px-8 pt-8">
        <p className="font-semibold">Estatísticas Gerais</p>

        {/* ROUNDED CARD */}
        <div className="flex flex-col gap-4">
          <div className="grid w-full grid-cols-1 items-center gap-3 lg:grid-cols-2">
            <div className="flex flex-col items-center justify-center rounded-lg bg-base200 p-4 text-base900">
              <span className="text-xl font-bold">{stats.totalMeals}</span>
              <p>Refeições registradas</p>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg bg-base200 p-4 text-base900">
              <span className="text-xl font-bold">{stats.bestStreak}</span>
              <p>Melhor sequência de pratos dentro da dieta</p>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 items-center gap-4">
            <div className="flex h-full flex-col items-center rounded-lg bg-red-200 p-4 text-center text-black/90">
              <span className="text-xl font-bold">{stats.outsideDiet}</span>
              <p>Refeições fora da dieta</p>
            </div>
            <div className="flex h-full flex-col items-center rounded-lg bg-greenLight p-4 text-center text-black/90">
              <span className="text-xl font-bold">{stats.withinDiet}</span>
              <p>Refeições dentro da dieta</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
