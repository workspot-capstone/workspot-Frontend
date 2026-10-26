export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type MapViewProps = {
  currentPosition: Coordinates | null;
  onMapCreate: (map: kakao.maps.Map) => void;
  onSelectCafe: (id: number) => void;
};
