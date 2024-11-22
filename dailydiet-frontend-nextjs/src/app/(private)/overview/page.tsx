export default function OverView() {
  return (
    <div className="min-h-screen bg-greenMid">
      {/* PERCENTAGE CARD */}
      <div className="group relative flex w-full flex-col items-center justify-center bg-greenMid p-2 py-10">
        <span className="text-3xl font-bold leading-[130%] text-black group-hover:text-black/75">
          90,86%
        </span>
        <p className="text-black">das refeições dentro da dieta</p>
      </div>

      <div className="flex min-h-screen flex-col items-center gap-8 rounded-t-3xl bg-base100 px-8 pt-8">
        <p className="font-semibold">Estatísticas Gerais</p>

        <div className="grid w-full grid-cols-1 items-center gap-4 lg:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-lg bg-base200 p-4 text-base900">
            <span className="text-xl font-bold">22</span>
            <p>Melhor sequência de pratos dentro da dieta</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-base200 p-4 text-base900">
            <span className="text-xl font-bold">22</span>
            <p>Melhor sequência de pratos dentro da dieta</p>
          </div>
        </div>
      </div>
    </div>
  )
}
