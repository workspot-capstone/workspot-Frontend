import { Clock, MapPin, Phone, Volume2, Wifi, Plug, Sparkle, Armchair } from "lucide-react"
import type { ReactNode } from "react"
import { mockCafeDetails } from "../mocks/mockCafeDetails"
import sparkles from "../assets/sparkles.png"
import type { CafeDetailProps } from "../types/CafeProps"

const environmentItems: {
  key: keyof CafeDetailProps["workspace"]
  label: string
  icon: ReactNode
}[] = [
  { key: "noise", label: "소음", icon: <Volume2 aria-hidden="true" className="h-5 w-5 text-gray-900" /> },
  { key: "outlet", label: "콘센트", icon: <Plug aria-hidden="true" className="h-5 w-5 text-gray-900" /> },
  { key: "wifi", label: "Wi-Fi", icon: <Wifi aria-hidden="true" className="h-5 w-5 text-gray-900" /> },
  { key: "atmosphere", label: "분위기", icon: <Sparkle aria-hidden="true" className="h-5 w-5 text-gray-900" /> },
  { key: "table", label: "테이블", icon: <Armchair aria-hidden="true" className="h-5 w-5 text-gray-900" /> },
  { key: "longStay", label: "장시간 이용", icon: <Clock aria-hidden="true" className="h-5 w-5 text-gray-900" /> },
]

export const CafeDetail = ({ id }: { id: number }) => {
  const cafe = mockCafeDetails.find((cafe) => cafe.id === id)

  if (!cafe) {
    return <p>카페 정보를 찾을 수 없습니다.</p>
  }

  const infoItems = [
    { icon: <MapPin aria-hidden="true" className="h-4 w-4 text-gray-700" />, text: cafe.address },
    { icon: <Clock aria-hidden="true" className="h-4 w-4 text-gray-700" />, text: cafe.operatingHours },
    { icon: <Phone aria-hidden="true" className="h-4 w-4 text-gray-700" />, text: cafe.phone },
  ]

  return (
    <div className="mx-4">
      <div data-middle-snap>
        <img src={cafe.imageUrls[0]} alt={`${cafe.name} 이미지`} className="w-full h-55 rounded-lg object-cover" />
        <div className="flex justify-between items-center gap-2 my-4">
          <h1 className="text-title">{cafe.name}</h1>
          <p className="text-body text-text-description pr-1">{cafe.distance}m</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 my-3">
        {infoItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {item.icon}
            <p className="text-small text-text-description">{item.text}</p>
          </div>
        ))}
      </div>
      <h2 className="text-[16px] font-semibold mt-4">작업환경 정보</h2>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {environmentItems.map((item) => (
          <div key={item.key} className="flex flex-col items-center py-5 gap-0.5 border border-border rounded-xl">
            {item.icon}
            <p className="text-body text-text-description">{item.label}</p>
            <p className="text-body font-semibold">{cafe.workspace[item.key]}</p>
          </div>
        ))}
      </div>
      <div>

      </div>
      <div className="bg-workspot-blue-200 rounded-lg p-4 my-4">
        <div className="flex items-center gap-2">
          <img src={sparkles} alt="Sparkles" className="w-4 h-4" />
          <h2 className="text-[16px] font-semibold text-primary">추천 이유</h2>
        </div>
        <p className="text-body text-text-description">{cafe.recommendation.reason}</p>
      </div>
    </div>
  )
}