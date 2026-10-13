import { Clock, MapPin, Phone, Volume2, Wifi, Plug, Sparkle, Armchair } from "lucide-react"
import { mockCafeDetails } from "../mocks/mockCafeDetails"

export const CafeDetail = ({ id }: { id: number }) => {
  const cafe = mockCafeDetails.find((cafe) => cafe.id === id)

  const infoItems = [
    {icon: <MapPin aria-hidden="true" className="h-4 w-4 text-gray-700" />, text: cafe?.address},
    {icon: <Clock aria-hidden="true" className="h-4 w-4 text-gray-700" />, text: cafe?.operatingHours},
    {icon: <Phone aria-hidden="true" className="h-4 w-4 text-gray-700" />, text: cafe?.phone} 
  ]

  const environmentItems = [
    {icon: <Volume2 aria-hidden="true" className="h-5 w-5 text-gray-900" />, name: "noise", value: cafe?.workspace.noise},
    {icon: <Plug aria-hidden="true" className="h-5 w-5 text-gray-900" />, name: "outlet", value: cafe?.workspace.outlet},
    {icon: <Wifi aria-hidden="true" className="h-5 w-5 text-gray-900" />, name: "wifi", value: cafe?.workspace.wifi},
    {icon: <Sparkle aria-hidden="true" className="h-5 w-5 text-gray-900" />, name: "atmosphere", value: cafe?.workspace.atmosphere},
    {icon: <Armchair aria-hidden="true" className="h-5 w-5 text-gray-900" />, name: "table", value: cafe?.workspace.table},
    {icon: <Clock aria-hidden="true" className="h-5 w-5 text-gray-900" />, name: "longStay", value: cafe?.workspace.longStay},
  ]

  if (!cafe) {
    return <p>카페 정보를 찾을 수 없습니다.</p>
  }

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
        {Object.entries(cafe.workspace).map(([name, value]) => (
          <div key={name} className="flex flex-col items-center py-5 gap-0.5 border border-border rounded-xl">
            {environmentItems.find((item) => item.name === name)?.icon}
            <p className="text-body text-text-description">{name}</p>
            <p className="text-body font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}