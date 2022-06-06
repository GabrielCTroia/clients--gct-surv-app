import { useCallback } from "react";

export const useCurrentLocation = () => {
  return useCallback(() => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }, []);
};
