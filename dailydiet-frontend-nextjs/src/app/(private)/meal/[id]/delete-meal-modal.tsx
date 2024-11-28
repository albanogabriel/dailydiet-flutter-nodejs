import { deleteMeal } from "@/app/api/delete-meal"
import { APP_ROUTES } from "@/middleware"
import { useRouter } from "next/navigation"

interface DeleteMealModal {
  mealId: string
  closeModal: () => void
}

export default function DeleteMealModal({
  mealId,
  closeModal,
}: DeleteMealModal) {
  const router = useRouter()

  const excludeMeal = async () => {
    await deleteMeal(mealId)
    router.push(APP_ROUTES.private.home)
  }

  return (
    <div className="fixed inset-0 bg-black/75">
      <div className="absolute flex h-full w-full items-center justify-center">
        <div className="flex flex-col gap-8 rounded-lg bg-base100 px-12 pb-12 pt-16">
          <h1 className="text-center text-[18px] font-bold text-base800">
            Deseja realmente excluir o registro da refeição?
          </h1>
          <div className="flex gap-4">
            <button
              onClick={closeModal}
              className="w-full rounded-md border border-base800 bg-base100 px-6 py-4 font-bold text-base800"
            >
              Cancelar
            </button>

            <button
              onClick={excludeMeal}
              className="w-full rounded-md bg-base800 px-6 py-4 font-bold text-base100"
            >
              Sim, excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
