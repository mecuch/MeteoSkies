import { useEffect, useState } from "react";

type Coords = {
  latitude: number;
  longitude: number;
};

type Props = {
  cityName: string;
  onResolved: (coords: Coords | null) => void;
};

export default function GeoCoder({ cityName, onResolved }: Props){
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`;
  
      fetch(url)
        .then(res => res.json())
        .then(data => {
            const r = data.results[0]
          onResolved({
            latitude: r.latitude,
            longitude: r.longitude,
          });
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, [cityName, onResolved]);
    if (loading) return <p>Szukanie współrzędnych…</p>;
  return null;
}