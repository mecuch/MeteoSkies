import "./Corpse.css";
import  CityWeatherBridge from "./Bridge";

type Props = {
  cities: string[];
};

export default function Corpse({ cities }: Props) {
  if (cities.length === 0) {
    return (
      <div className="city-body">
        <p>Nie wybrano miasta...</p>
      </div>
    );
  }

  return (
    <div className="city-body">
      <ul>
        {cities.map((city, index) => (
          <li key={index}>
            {city}
            <CityWeatherBridge cityName={city} />
          </li>
        ))}
      </ul>
    </div>
  );
}