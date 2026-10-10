import type { CafeListProps } from '../types/CafeProps'

export const CafeList = ({cafes} : {cafes: CafeListProps[]}) => {
  return (
    <div>
      {cafes.map((cafe) => (
        <div key={cafe.id} className="flex items-center m-3 gap-2.5">
          <img src={cafe.imageUrl} alt="카페 이미지" className="w-18 h-16 rounded-md" />
          <div className="w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-body font-bold text-text-primary">{cafe.name}</h2>
              <p className="text-small font-semibold text-primary">적합도 {cafe.score}%</p>
            </div>
            <p className="text-small text-text-description">{cafe.distance} · {cafe.address}</p>
            <div>
              {cafe.tags.map((tag, index) => (
                <span key={index} className="text-small text-text-description bg-workspot-gray-100 rounded-xl px-3 py-1 mr-2">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}