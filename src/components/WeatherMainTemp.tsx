import { useEffect, useState } from "react";

type Props = {
  latitude: number;
  longitude: number;
};

export default function WeatherTemperature({ latitude, longitude }: Props) {
  const [temp, setTemp] = useState<number | null>(null);
  const [wethcode, setWethcode] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setTemp(data.current_weather.temperature);
        setWethcode(data.current_weather.weathercode)
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [latitude, longitude]);

  if (loading) return <p>Ładuję temperaturę…</p>;
  if (temp === null) return <p>Brak danych pogodowych</p>;

  return (
  <p>{temp}°C {wethcode}</p>
);
}