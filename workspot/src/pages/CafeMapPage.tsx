import { useState } from "react";
import { BottomSheet } from "../components/BottomSheet";
import { Header } from "../components/Header"
import { MapView } from "../components/MapView";
import { Search } from "../components/Search";
import { ServiceArea } from "../components/ServiceArea"
import { useGeolocation } from "../hooks/useGeolocation";
import { mockCafes } from "../mocks/mockCafes";

export const CafeMapPage = () => {
  const [selectedCafeId, setSelectedCafeId] = useState<number | null>(null);
  const { position } = useGeolocation();
  // MapView에서 생성된 지도 인스턴스를 저장 
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  // 현재 위치로 지도 이동
  const handleRecenterMap = () => {
    if (!map || !position) return;

    map.panTo(
      new kakao.maps.LatLng(
        position.latitude,
        position.longitude
      )
    );
  };

  // 마커 클릭시 지도 중심 이동
  const handleMarkerSelect = (cafeId: number) => {
    setSelectedCafeId(cafeId);
    const cafe = mockCafes.find((cafe) => cafe.id === cafeId);
    if (!map || !cafe) return;

    map.panTo(new kakao.maps.LatLng(cafe.latitude, cafe.longitude));
  };

  // API
  const handleSearch = (query: string) => {
    console.log('검색어:', query);
  }

  return (
    <div className="flex h-dvh flex-col">
      <Header
        title="Workspot"
        content={<ServiceArea content="명지대 일대" />}
        extraContent={<Search onSearch={handleSearch} />}
        contentClassName="w-fit" />
      <div className="flex-1">
        <MapView
          currentPosition={position}
          onMapCreate={setMap}
          onSelectCafe={handleMarkerSelect}
          selectedCafeId={selectedCafeId}
        />
      </div>
      <BottomSheet
        onReturnToCurrentPosition={handleRecenterMap}
        selectedCafeId={selectedCafeId}
        onSelectCafe={setSelectedCafeId} />
    </div>
  )
}
