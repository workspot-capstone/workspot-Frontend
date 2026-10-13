import type { CafeListComponentProps } from '../types/CafeProps'

export const CafeList = ({cafes, onSelect} : CafeListComponentProps) => {
  return (
    <div>
      {cafes.map((cafe) => (
        <button
          key={cafe.id}
          type="button"
          onClick={() => onSelect(cafe.id)}
          className="m-3 flex w-[calc(100%-1.5rem)] items-center gap-2.5 border-0 bg-transparent p-0 text-left"
        >
          <img src={cafe.imageUrl} alt={`${cafe.name} 이미지`} className="w-18 h-16 rounded-md" />
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
        </button>
      ))}
    </div>
  )
}