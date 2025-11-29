import "./Corpse.css";
import type { City } from "../data/cities";
import WeatherTemperature from "./WeatherMainTemp";"./WeatherMainTemp"

type Props = {
  cities: City[];
};

export default function Corpse({ cities }: Props) {
  if (cities.length === 0) {
    return (
      <div className="city-body">
        <p>Nie wybrano miasta.</p>
      </div>
    );
  }

  return (
    <div className="city-body">
      <ul>
        {cities.map((city) => (
          <li key={city.id}>{city.name} <WeatherTemperature latitude={city.latitude} longitude={city.longitude} 
/></li>
        ))}
      </ul>
    </div>
  );
}