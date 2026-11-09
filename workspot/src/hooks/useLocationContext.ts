import { useOutletContext } from 'react-router-dom';
import { useGeolocation } from './useGeolocation';

type LocationContext = ReturnType<typeof useGeolocation>;

export const useLocationContext = () => useOutletContext<LocationContext>();
