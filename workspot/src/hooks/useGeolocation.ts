import { useEffect, useState } from 'react';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export const useGeolocation = () => {
  const [position, setPosition] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('이 브라우저에서는 위치 정보를 사용할 수 없습니다.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        setLoading(false);
      },
      () => {
        setError('현재 위치를 가져오지 못했습니다.');
        setLoading(false);
      }
    );
  }, []);

  return {
    position,
    loading,
    error,
  };
};