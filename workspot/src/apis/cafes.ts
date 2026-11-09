import type { CafeDetailProps, CafeListProps } from '../types/CafeProps';
import type { ServiceRegion } from '../constants/serviceArea';
import { api } from './apis';

//검색어 입력
export const searchCafes = async ( query: string, region: ServiceRegion ): Promise<CafeListProps[]> => {
  const normalizedQuery = query.trim();
  const response = await api.post<CafeListProps[]>('/cafes/search', {
    query: normalizedQuery,
    region,
  });

  return response.data;
};

//카페 TOP3 리스트 조회
export const getCafes = async (region: ServiceRegion): Promise<CafeListProps[]> => {
  const response = await api.get<CafeListProps[]>('/cafes', {
    params: { region },
  });

  return response.data;
};

//카페 상세 조회
export const getCafeDetail = async (cafeId: number): Promise<CafeDetailProps> => {
  const response = await api.get<CafeDetailProps>(`/cafes/${cafeId}`);

  return response.data;
};