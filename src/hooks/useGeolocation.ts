import { useEffect, useState } from "react";

export interface GeoState {
  position: { lat: number; lng: number } | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation(): GeoState {
  const [state, setState] = useState<GeoState>({ position: null, error: null, loading: true });

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setState({ position: null, error: "Geolocation not supported", loading: false });
      return;
    }
    const id = navigator.geolocation.watchPosition(
      pos => setState({ position: { lat: pos.coords.latitude, lng: pos.coords.longitude }, error: null, loading: false }),
      err => setState({ position: null, error: err.message, loading: false }),
      { enableHighAccuracy: false, maximumAge: 30_000, timeout: 10_000 }
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

  return state;
}