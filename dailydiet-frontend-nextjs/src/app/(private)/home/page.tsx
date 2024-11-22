"use client"
import CreateMealModal from "@/app/_components/create-meal-modal"
import MealsTimelineWithArray from "@/app/_components/meals-timeline-using-array"
import { ArrowUpRight, Plus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
  const [isCreateMealModalOpen, setIsCreateMealModalOpen] = useState(false)

  return (
    <div className="container space-y-8">
      {/* PERCENTAGE CARD */}
      <Link
        href="/overview"
        className="group relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-greenMid/75 p-2 py-10 transition-colors duration-300 ease-in-out hover:bg-greenMid"
      >
        <ArrowUpRight className="absolute right-2 top-2 text-greenDark transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-[-0.25rem]" />
        <span className="text-3xl font-bold leading-[130%] text-black/75 group-hover:text-black">
          90,86%
        </span>
        <p className="text-black">das refeições dentro da dieta</p>
      </Link>

      {/* ADD MEALS */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Refeições</h3>
        <button
          onClick={() => setIsCreateMealModalOpen(true)}
          className="flex w-full items-center justify-center gap-6 rounded-lg bg-base800 p-4 text-base200 hover:bg-base800/85"
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
