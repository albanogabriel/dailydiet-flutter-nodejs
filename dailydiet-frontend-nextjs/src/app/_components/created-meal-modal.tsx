import Image from "next/image"
import { useRouter } from "next/navigation" // useRouter de 'next/navigation'
import { useEffect } from "react"

interface CreatedMealModal {
  is_within_diet: boolean
  onCloseCreatedModal: () => void
  onCloseCreateModal: () => void
}

export default function CreatedMealModal({
  is_within_diet,
  onCloseCreateModal,
  onCloseCreatedModal,
}: CreatedMealModal) {
  const router = useRouter()

  useEffect(() => {
    // Aqui, não usamos 'router.asPath', apenas navegação para a home
    router.replace("/home") // Substitui a rota atual para "/home"
  }, [router])

  const handleNavigation = () => {
    onCloseCreateModal()
    onCloseCreatedModal()
    router.replace("/home") // Substitui a rota atual para "/home"
    window.location.reload() // Force a full page reload
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-base100">
      {is_within_diet ? (
        <div className="flex flex-col items-center gap-14">
          <div className="flex flex-col items-center">
            <h1 className="text-[24px] font-bold text-greenDark">
              Continue assim!
            </h1>
            <p className="text-[18px] text-base800">
              Você continua <span className="font-bold">dentro da dieta. </span>
              Muito bem!
            </p>
          </div>
          <Image
            src={"/woman-success-created-meal.svg"}
            width={224}
            height={288}
            alt="woman success created meal"
          />

          <button
            className="flex w-full items-center justify-center rounded-lg bg-base800 p-6 font-bold text-base150"
            onClick={handleNavigation}
          >
            Voltar para a home
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-14">
          <div className="flex flex-col items-center">
            <h1 className="text-[24px] font-bold text-red-900">Que pena!</h1>
            <p className="text-[18px] text-base800">
              Você <span className="font-bold">saiu da dieta</span> dessa vez
              mas continue se esforçando e não desista
            </p>
          </div>
          <Image
            src={"/man-fail-created-meal.svg"}
            width={224}
            height={288}
            alt="man fail created meal"
          />

          <button
            className="flex w-full items-center justify-center rounded-lg bg-base800 p-6 font-bold text-base150"
            onClick={handleNavigation}
          >
            Voltar para a home
          </button>
        </div>
      )}
    </div>
  )
}
