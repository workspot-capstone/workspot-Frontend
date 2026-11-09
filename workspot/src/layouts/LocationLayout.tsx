import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { toast } from 'sonner';
import { useGeolocation } from '../hooks/useGeolocation';

export const LocationLayout = () => {
  const location = useGeolocation();

  useEffect(() => {
    if (location.error) {
      toast.error(location.error);
    }
  }, [location.error]);

  return <Outlet context={location} />;
};
