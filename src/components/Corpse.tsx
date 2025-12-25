import "./Corpse.css";
import  CityWeatherBridge from "./Bridge";
import { useNavigate } from "react-router-dom";
import type { TempUnit } from "../App";

type Props = {
  cities: string[];
  onRemoveCity: (city: string) => void;
  unit: TempUnit
};

export default function Corpse({ cities, onRemoveCity, unit }: Props) {
  const navigate = useNavigate();
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
            <CityWeatherBridge cityName={city} unit={unit} />
            <button onClick={() => navigate(`/more/${encodeURIComponent(city)}`)} className="button">Szczegóły</button>
            <button className="button" onClick={() => onRemoveCity(city)}>X</button>
          </li> 
        ))}
      </ul>
    </div>
  );
}