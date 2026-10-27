import { CustomOverlayMap, Map, useKakaoLoader } from "react-kakao-maps-sdk";
import { mockCafes } from "../mocks/mockCafes";
import { CurrentLocation } from "./CurrentLocation";
import type { MapViewProps } from "../types/MapProps";
import { useCallback } from "react";
import { CafeMarker } from "./CafeMarker";

export const MapView = ({ currentPosition, onMapCreate, onSelectCafe, selectedCafeId }: MapViewProps) => {
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
  });

  // 지도 중심 좌표
  const center = {
    lat: 37.222,
    lng: 127.19,
  };

  // 카페 TOP 5를 기준으로 Bound 설정
  const handleMapCreate = useCallback((map: kakao.maps.Map) => {
    onMapCreate(map); // 지도 생성 후 setMap에 저장, useCallback으로 재렌더링 방지

    if (mockCafes.length === 0) return;

    const bounds = new kakao.maps.LatLngBounds();

    mockCafes.forEach((cafe) => {
      bounds.extend(
        new kakao.maps.LatLng(cafe.latitude, cafe.longitude)
      );
    });

    map.setBounds(bounds);
  }, [onMapCreate]);

  if (loading) {
    return <p role="status">지도를 불러오는 중...</p>;
  }

  if (error) {
    return <p role="alert">지도를 불러오지 못했습니다.</p>;
  }

  return (
    <div className="relative h-full w-full">
      <Map
        center={center}
        level={3}
        style={{ width: "100%", height: "100%" }}
        onCreate={handleMapCreate}
      >
        {currentPosition && (
          // 현재 위치 아이콘
          <CustomOverlayMap
            position={{
              lat: currentPosition.latitude,
              lng: currentPosition.longitude,
            }}
            xAnchor={0.5}
            yAnchor={0.5}
            zIndex={10}
          >
            <CurrentLocation />
          </CustomOverlayMap>
        )}

        {mockCafes.map((cafe) => (
          <CafeMarker
            key={cafe.id}
            cafe={cafe}
            isSelected={cafe.id === selectedCafeId}
            onSelect={onSelectCafe}
          />
        ))}
      </Map>
    </div>
  );
};