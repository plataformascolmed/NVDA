import { PlanesClient } from "./PlanesClient"
import { TopNav } from "@/components/layout/TopNav"
import { BottomNav } from "@/components/layout/BottomNav"

export const metadata = {
  title: "Planes de Inversión | NVDA Capital Partners",
  description: "Selecciona el mejor plan de inversión para hacer crecer tu capital.",
}

export default function PlanesPage() {
  return (
    <div className="bg-white min-h-screen">
      <TopNav />
      <div className="px-4">
        <PlanesClient />
      </div>
      <BottomNav />
    </div>
  )
}
