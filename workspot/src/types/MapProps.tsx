import type { CafeListProps } from './CafeProps';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type MapViewProps = {
  currentPosition: Coordinates | null;
  cafes: CafeListProps[];
  onMapCreate: (map: kakao.maps.Map) => void;
  onSelectCafe: (id: number) => void;
  selectedCafeId: number | null;
};
