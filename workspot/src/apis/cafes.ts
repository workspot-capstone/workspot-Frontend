import type { CafeDetailProps, CafeListProps } from '../types/CafeProps';
import { api } from './apis';

//검색어 입력
export const searchCafes = async (query: string): Promise<CafeListProps[]> => {
  const normalizedQuery = query.trim();
  const response = await api.post<CafeListProps[]>('/cafes/search', {
    query: normalizedQuery,
  });

  return response.data;
};

//카페 TOP3 리스트 조회
export const getCafes = async (): Promise<CafeListProps[]> => {
  const response = await api.get<CafeListProps[]>('/cafes');

  return response.data;
};

//카페 상세 조회
export const getCafeDetail = async (cafeId: number): Promise<CafeDetailProps> => {
  const response = await api.get<CafeDetailProps>(`/cafes/${cafeId}`);

  return response.data;
};