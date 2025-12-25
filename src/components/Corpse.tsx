import "./Corpse.css";
import  CityWeatherBridge from "./Bridge";
import { useNavigate } from "react-router-dom";
import type { TempUnit } from "../App";

type Props = {
  cities: string[];
  onRemoveCity: (city: string) => void;
  unit: TempUnit;
  toggleFavorite:  (city: string) => void;
  favSet: Set<string>;
};

export default function Corpse({ cities, onRemoveCity, unit, toggleFavorite, favSet }: Props) {
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
        {cities.map((city) => {
          const isFav = favSet.has(city);
          return (
            <li key={city} className="city-row">
              <div className="city-left">
                <span className="city-name">{city}</span>
                <CityWeatherBridge cityName={city} unit={unit} />
                </div>
                <div className="city-actions">
                  <button type="button" className="button" onClick={() => toggleFavorite(city)}>
                    {isFav ? "💗" : "🖤"}
                    </button>
                    <button type="button" className="button" onClick={() => navigate(`/more/${encodeURIComponent(city)}`)}>
                      Szczegóły
                      </button>
                      <button type="button" className="button" onClick={() => onRemoveCity(city)}>
                        X
                      </button>
                      </div>
                      </li>
                      );
                      })}
                      </ul>
                      </div>
                      )
                    }