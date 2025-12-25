import { useEffect, useState } from "react";
import { weatherCodeToIcon10 } from "./WeatherIcons";
import { toDisplayTemp, unitLabel } from "../utils/unitchanger";
import type { TempUnit } from "../App";

type Props = {
  latitude: number;
  longitude: number;
  unit: TempUnit;
};

export default function WeatherDetails({ latitude, longitude, unit }: Props) {
  const [temp, setTemp] = useState<number | null>(null);
  const [wethcode, setWethcode] = useState<number | null>(null);
  const [precipprob, setPrecipProb] = useState<number | null>(null);
  const [precipsum, setPrecipSum] = useState<number>(0);
  const [rainsum, setRainSum] = useState<number>(0);
  const [snowfallsum, setSnowfallSum] = useState<number>(0);
  const [windspd, SetWindSpd] = useState<number>(0);
  const [winddir, SetWindDir] = useState<number>(0);

  const [loading, setLoading] = useState(true);

  const shown = temp !== null ? toDisplayTemp(temp, unit) : null;

  useEffect(() => {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${latitude}&longitude=${longitude}` +
      `&current_weather=true` +
      `&daily=precipitation_probability_max,precipitation_sum,rain_sum,snowfall_sum,windspeed_10m_max,winddirection_10m_dominant` +
      `&forecast_days=1` +
      `&timezone=auto`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTemp(data.current_weather?.temperature ?? null);
        setWethcode(data.current_weather?.weathercode ?? null);
        setPrecipProb(data.daily?.precipitation_probability_max?.[0] ?? null);
        setPrecipSum(data.daily?.precipitation_sum?.[0] ?? 0);
        setRainSum(data.daily?.rain_sum?.[0] ?? 0);
        setSnowfallSum(data.daily?.snowfall_sum?.[0] ?? 0);
        SetWindSpd(data.daily?.windspeed_10m_max?.[0] ?? 0);
        SetWindDir(data.daily?.winddirection_10m_dominant?.[0] ?? 0);

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [latitude, longitude]);

  if (loading) return <p>Ładuję temperaturę…</p>;
  if (temp === null || wethcode === null) return <p>Brak danych pogodowych</p>;

  const iconName = weatherCodeToIcon10[wethcode];

  const directions =
    ["północny (N)",
     "północno-wschodni (NE)",
     "wschodni (E)",
     "południowo-wschodni (SE)",
     "południowy (S)",
     "południowo-zachodni (SW)",
     "zachodni (W)",
     "północno-zachodni (NW)"]

  const winddirLabel = directions[Math.round(winddir / 45) % 8]

  const precipLabel =
    snowfallsum > 0
      ? `śnieg: ${snowfallsum} cm`
      : rainsum > 0
      ? `deszcz: ${rainsum} mm`
      : "brak opadów";
  
  return (
    <div className="details-header">
      <div className="weather-icon-big">
        <img
          className="weather-icon-big"
          src={`/icons/${iconName}.png`}
          alt={iconName}
        />
      </div>
      <div>
        <p className="weather-temp-big">
          {shown !== null ? `${Math.round(shown)}${unitLabel(unit)}` : "—"}
        </p>
        <p>
          Prawdopodobieństwo opadów:{" "}
          {precipprob !== null ? `${precipprob}%` : "brak danych"}
        </p>
        <p>Opady łącznie: {precipsum} mm, {precipLabel}</p>
        <p>Wiatr: {windspd} km/h, {winddirLabel}</p>
      </div>
    </div>
  );
}
