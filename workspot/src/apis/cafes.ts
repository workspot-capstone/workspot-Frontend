import type { CafeDetailProps, CafeListProps } from '../types/CafeProps';
import type { ServiceRegion } from '../constants/serviceArea';
import type { Coordinates } from '../types/MapProps';
import { api } from './apis';

const MYONGJI_NATURAL_CAMPUS_CENTER: Coordinates = {
  latitude: 37.2224,
  longitude: 127.1892,
};

//검색어 입력
export const searchCafes = async ( query: string, region: ServiceRegion, position?: Coordinates | null ): Promise<CafeListProps[]> => {
  const normalizedQuery = query.trim();
  const coordinates = position ?? MYONGJI_NATURAL_CAMPUS_CENTER;
  const response = await api.post<CafeListProps[]>('/cafes/search', {
    query: normalizedQuery,
    region,
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
  });

  return response.data;
};

//카페 TOP3 리스트 조회
export const getCafes = async ( region: ServiceRegion, position?: Coordinates | null ): Promise<CafeListProps[]> => {
  const coordinates = position ?? MYONGJI_NATURAL_CAMPUS_CENTER;
  const response = await api.get<CafeListProps[]>('/cafes', {
    params: {
      region,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    },
  });

  return response.data;
};

//카페 상세 조회
export const getCafeDetail = async (
  cafeId: number,
  position?: Coordinates | null,
): Promise<CafeDetailProps> => {
  const coordinates = position ?? MYONGJI_NATURAL_CAMPUS_CENTER;
  const response = await api.get<CafeDetailProps>(`/cafes/${cafeId}`, {
    params: {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    },
  });

  return response.data;
};