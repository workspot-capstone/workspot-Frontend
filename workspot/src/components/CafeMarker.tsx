import { CustomOverlayMap } from "react-kakao-maps-sdk";
import type { CafeMarkerProps } from "../types/CafeProps";

export const CafeMarker = ({
  cafe,
  isSelected,
  onSelect,
}: CafeMarkerProps) => {
  return (
    <CustomOverlayMap
      position={{
        lat: cafe.latitude,
        lng: cafe.longitude,
      }}
      xAnchor={0.5}
      yAnchor={1}
      zIndex={isSelected ? 20 : 1}
      clickable
    >
      <button
        type="button"
        title={cafe.name}
        aria-label={`${cafe.name} 선택`}
        aria-pressed={isSelected}
        onClick={() => onSelect(cafe.id)}
        className="block cursor-pointer border-0 bg-transparent p-0 leading-none drop-shadow-md transition-transform duration-150"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 36"
          width={28}
          height={42}
          className={`block transition-transform duration-150 ${
            isSelected ? "scale-125" : "scale-100"
          }`}
        >
          <path
            fill={isSelected ? "#2875F5" : "#539DFF"}
            d="M12 0C5.4 0 0 5.4 0 12c0 8.5 12 24 12 24s12-15.5 12-24C24 5.4 18.6 0 12 0Z"
          />
          <circle cx="12" cy="12" r="4" fill="white" />
        </svg>
      </button>
    </CustomOverlayMap>
  );
};