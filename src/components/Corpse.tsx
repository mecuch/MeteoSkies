import "./Corpse.css";
import  CityWeatherBridge from "./Bridge";
import { useNavigate } from "react-router-dom";

type Props = {
  cities: string[];
  onRemoveCity: (city: string) => void;
};

export default function Corpse({ cities, onRemoveCity }: Props) {
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
            <CityWeatherBridge cityName={city} />
            <button onClick={() => navigate(`/more/${encodeURIComponent(city)}`)} className="button">Szczegóły</button>
            <button className="button" onClick={() => onRemoveCity(city)}>X</button>
          </li> 
        ))}
      </ul>
    </div>
  );
}