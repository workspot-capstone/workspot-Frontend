import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { BottomSheet } from "../components/BottomSheet";
import { Header } from "../components/Header"
import { MapView } from "../components/MapView";
import { Search } from "../components/Search";
import { ServiceArea } from "../components/ServiceArea"
import { getCafes, searchCafes } from "../apis/cafes";
import { getServiceRegion } from "../constants/serviceArea";
import { useLocationContext } from "../hooks/useLocationContext";

export const CafeMapPage = () => {
  const [selectedCafeId, setSelectedCafeId] = useState<number | null>(null);
  const { position, loading } = useLocationContext();

  // MapView에서 생성된 지도 인스턴스를 저장 
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  
  // 검색어에 따른 카페 목록 조회
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query")?.trim() ?? "";
  const region = getServiceRegion(searchParams.get("region"));
  const cafesQuery = useQuery({
    queryKey: ["cafes", searchQuery, region, position?.latitude, position?.longitude],
    queryFn: () => searchQuery
      ? searchCafes(searchQuery, region, position)
      : getCafes(region, position),
    enabled: !loading,
    staleTime: 30_000,
  });

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
    const cafe = cafesQuery.data?.find((cafe) => cafe.id === cafeId);
    if (!map || !cafe) return;

    map.panTo(new kakao.maps.LatLng(cafe.latitude, cafe.longitude));
  };

  const handleSearch = (query: string) => {
    setSelectedCafeId(null);
    setSearchParams({ query, region });
  }

  const handleRegionChange = (nextRegion: typeof region) => {
    setSelectedCafeId(null);
    setSearchParams((currentParams) => {
      currentParams.set("region", nextRegion);
      return currentParams;
    });
  }

  // 카페 목록이 변경될 때마다 지도 범위 조정
  useEffect(() => {
    if (!map || !cafesQuery.data?.length) return;

    const bounds = new kakao.maps.LatLngBounds();
    cafesQuery.data.forEach((cafe) => {
      bounds.extend(new kakao.maps.LatLng(cafe.latitude, cafe.longitude));
    });
    map.setBounds(bounds);
  }, [cafesQuery.data, map]);

  return (
    <div className="flex h-dvh flex-col">
      <Header
        title="Workspot"
        content={<ServiceArea region={region} onRegionChange={handleRegionChange} />}
        extraContent={
          <Search
            key={searchQuery}
            onSearch={handleSearch}
            isLoading={cafesQuery.isFetching}
            initialQuery={searchQuery}
          />
        }
        contentClassName="w-fit" />
      <div className="flex-1">
        <MapView
          currentPosition={position}
          cafes={cafesQuery.data ?? []}
          onMapCreate={setMap}
          onSelectCafe={handleMarkerSelect}
          selectedCafeId={selectedCafeId}
        />
      </div>
      <BottomSheet
        onReturnToCurrentPosition={handleRecenterMap}
        selectedCafeId={selectedCafeId}
        onSelectCafe={setSelectedCafeId}
        cafes={cafesQuery.data ?? []}
        isLoading={cafesQuery.isPending}
        isError={cafesQuery.isError}
        onRetry={() => void cafesQuery.refetch()}
      />
    </div>
  )
}
