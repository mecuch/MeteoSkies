import { useEffect, useState } from "react";
import { weatherCodeToIcon10 } from "./WeatherIcons";
import "./Forecast5Days.css";

type Props = {
  latitude: number;
  longitude: number;
};

type DayForecast = {
  date: string;
  tMin: number;
  tMax: number;
  weatherCode: number;
  precipProbMax: number | null;
};

function formatPLDate(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00`);
  return d.toLocaleDateString("pl-PL", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  });
}

export default function Forecast5Days({ latitude, longitude }: Props) {
  const [days, setDays] = useState<DayForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${latitude}&longitude=${longitude}` +
      `&daily=temperature_2m_max,temperature_2m_min,weathercode` +
      `&forecast_days=5` +
      `&timezone=auto`;

    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const daily = data.daily;

        const out: DayForecast[] = daily.time.slice(0, 5).map(
          (date: string, i: number) => ({
            date,
            tMin: daily.temperature_2m_min[i],
            tMax: daily.temperature_2m_max[i],
            weatherCode: daily.weathercode[i],
          })
        );

        setDays(out);
        setLoading(false);
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : "Błąd pobierania danych");
        setLoading(false);
      });
  }, [latitude, longitude]);

  if (loading) return <p>Ładuję prognozę 5-dniową…</p>;
  if (error) return <p>Błąd: {error}</p>;
  if (days.length === 0) return <p>Brak danych prognozy.</p>;

  return (
    <div className="forecast5">
      <h3 className="forecast5-title">Prognoza 5-dniowa</h3>

      <ul className="forecast5-list">
        {days.map((d) => {
          const iconName = weatherCodeToIcon10[d.weatherCode];

          return (
            <li key={d.date} className="forecast5-item">
              <div className="forecast5-date">
                {formatPLDate(d.date)}
              </div>

              <div className="forecast5-icon">
                <img
                  src={`/icons/${iconName}.png`}
                  alt={iconName}
                />
              </div>

              <div className="forecast5-temps">
                <div className="forecast5-temp-max">
                  {Math.round(d.tMax)}°
                </div>
                <div className="forecast5-temp-min">
                  {Math.round(d.tMin)}°
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
