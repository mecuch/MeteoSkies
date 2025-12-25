import { useEffect, useState } from "react";
import { weatherCodeToIcon10 } from "./WeatherIcons";
import { toDisplayTemp, unitLabel } from "../utils/unitchanger";
import type { TempUnit } from "../App";

type Props = {
  latitude: number;
  longitude: number;
  unit: TempUnit
};

export default function WeatherTemperature({ latitude, longitude, unit }: Props) {
  const [temp, setTemp] = useState<number | null>(null);
  const [wethcode, setWethcode] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const shown = temp !== null ? toDisplayTemp(temp, unit) : null;

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTemp(data.current_weather.temperature);
        setWethcode(data.current_weather.weathercode);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [latitude, longitude]);

  if (loading) return <p>Ładuję temperaturę…</p>;
  if (temp === null || wethcode === null)
    return <p>Brak danych pogodowych</p>;

  const iconName = weatherCodeToIcon10[wethcode];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      {shown !== null ? `${Math.round(shown)}${unitLabel(unit)}` : "—"}
      <img
        src={`/icons/${iconName}.png`}
        alt={iconName}
        width={32}
        height={32}
      />
    </div>
  );
}
