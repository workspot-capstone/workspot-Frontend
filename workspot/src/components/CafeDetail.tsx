import { Clock, MapPin, Phone } from "lucide-react"
import { mockCafeDetails } from "../mocks/mockCafeDetails"

export const CafeDetail = ({ id }: { id: number }) => {
  const cafe = mockCafeDetails.find((cafe) => cafe.id === id)

  if (!cafe) {
    return <p>카페 정보를 찾을 수 없습니다.</p>
  }

  return (
    <div className="mx-4">
      <img src={cafe.imageUrls[0]} alt={`${cafe.name} 이미지`} className="w-full h-55 rounded-lg object-cover" />
      <div className="flex justify-between items-center gap-2 mt-3">
        <h1 className="text-title">{cafe.name}</h1>
        <p className="text-body text-text-description">{cafe.distance}m</p>
      </div>
      <div className="flex flex-col gap-1 my-3">
        <div className="flex items-center gap-2">
          <MapPin aria-hidden="true" className="h-5 w-5 text-gray-700" />
          <p className="text-body text-text-description">{cafe.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <Clock aria-hidden="true" className="h-4.5 w-4.5 text-gray-700" />
          <p className="text-body text-text-description">{cafe.operatingHours}</p>
        </div>
        <div className="flex items-center gap-2">
          <Phone aria-hidden="true" className="h-4.5 w-4.5 text-gray-700" />
          <p className="text-body text-text-description">{cafe.phone}</p>
        </div>
      </div>
      <h2 className="text-lg font-semibold">작업환경 정보</h2>
      {Object.entries(cafe.workspace).map(([name, value]) => (
        <div key={name}>
          <p>{name}: {value}</p>
        </div>
      ))}
    </div>
  )
}