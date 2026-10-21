import { useState } from "react";

interface Coordinates {
  lat: number;
  lon: number;
}

export function useGeolocation() {
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function getCurrentPosition(onSuccess: (coords: Coordinates) => void) {
    if (!navigator.geolocation) {
      setError("Your browser does not support location");
      return;
    }

    setIsLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        onSuccess({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        setIsLocating(false);
        setError("Location permission denied or not available");
      }
    );
  }

  return { isLocating, error, getCurrentPosition };
}