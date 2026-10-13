import { Map, useKakaoLoader } from "react-kakao-maps-sdk";

export const MapView = () => {
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
  });

  if (loading) {
    return <p role="status">지도를 불러오는 중...</p>
  }
  if (error) {
    return <p role="alert">지도를 불러오지 못했습니다.</p>
  }

  return (
    <Map
      center={{ lat: 37.222, lng: 127.19 }}
      level={3}
      style={{ width: "100%", height: "100%" }}
    />
  )
}