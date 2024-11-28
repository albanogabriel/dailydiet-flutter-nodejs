"use client"
import { Stats } from "@/app/@types/stats"
import CreateMealModal from "@/app/_components/create-meal-modal"
import MealsTimelineWithArray from "@/app/_components/meals-timeline-using-array"
import { getMealStats } from "@/app/api/get-meals-stats"
import { ArrowUpRight, Plus } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
  const [isCreateMealModalOpen, setIsCreateMealModalOpen] = useState(false)
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

  const mealPercentageWithinDiet = (stats.withinDiet * 100) / stats.totalMeals

  return (
    <div className="container h-full space-y-8">
      {/* PERCENTAGE CARD */}
      <Link
        href="/overview"
        className="group relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-greenMid/75 p-2 py-10 transition-colors duration-300 ease-in-out hover:bg-greenMid"
      >
        <ArrowUpRight className="absolute right-2 top-2 text-greenDark transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-[-0.25rem]" />
        <span className="text-3xl font-bold leading-[130%] text-black/75 group-hover:text-black">
          {mealPercentageWithinDiet.toFixed(2)}%
        </span>
        <p className="text-black">das refeições dentro da dieta</p>
      </Link>

      {/* ADD MEALS */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Refeições</h3>
        <button
          onClick={() => setIsCreateMealModalOpen(true)}
          className="flex w-full items-center justify-center gap-6 rounded-lg bg-base800 p-4 font-bold text-base200 hover:bg-base800/85"
        >
          <Plus /> Nova Refeição
        </button>
      </div>

      <MealsTimelineWithArray />

      {isCreateMealModalOpen && (
        <CreateMealModal closeModal={() => setIsCreateMealModalOpen(false)} />
      )}
    </div>
  )
}
