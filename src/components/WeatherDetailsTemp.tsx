import { useEffect, useState } from "react";
import { weatherCodeToIcon10 } from "./WeatherIcons";

type Props = {
  latitude: number;
  longitude: number;
};

export default function WeatherDetails({ latitude, longitude }: Props) {
  const [temp, setTemp] = useState<number | null>(null);
  const [wethcode, setWethcode] = useState<number | null>(null);

  const [precipprob, setPrecipProb] = useState<number | null>(null);
  const [precipsum, setPrecipSum] = useState<number>(0);
  const [rainsum, setRainSum] = useState<number>(0);
  const [snowfallsum, setSnowfallSum] = useState<number>(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${latitude}&longitude=${longitude}` +
      `&current_weather=true` +
      `&daily=precipitation_probability_max,precipitation_sum,rain_sum,snowfall_sum` +
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

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [latitude, longitude]);

  if (loading) return <p>Ładuję temperaturę…</p>;
  if (temp === null || wethcode === null) return <p>Brak danych pogodowych</p>;

  const iconName = weatherCodeToIcon10[wethcode];

  const precipLabel =
    snowfallsum > 0
      ? `śnieg: ${snowfallsum} cm`
      : rainsum > 0
      ? `deszcz: ${rainsum} mm`
      : "brak opadów (0)";

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
        <p className="weather-temp-big">{temp}°C</p>

        <p>
          Prawdopodobieństwo opadów:{" "}
          {precipprob !== null ? `${precipprob}%` : "brak danych"}
        </p>

        <p>Opady łącznie: {precipsum} mm</p>
        <p>{precipLabel}</p>
      </div>
    </div>
  );
}
