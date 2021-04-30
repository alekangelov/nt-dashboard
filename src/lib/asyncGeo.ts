import { useEffect, useState } from 'react';

export default async function asyncGeo(): Promise<GeolocationPosition> {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    return window.navigator.geolocation.getCurrentPosition(
      (e) => resolve(e),
      (err) => reject(err),
    );
  });
}

export function useAsyncGeo(): GeolocationPosition | null {
  const [state, setState] = useState<GeolocationPosition | null>(null);
  useEffect(() => {
    asyncGeo().then((e) => {
      setState({
        ...e,
        coords: {
          ...e.coords,
          latitude: parseFloat(e.coords.latitude.toFixed(3)),
          longitude: parseFloat(e.coords.longitude.toFixed(3)),
        },
      });
    });
  }, []);
  return state;
}
