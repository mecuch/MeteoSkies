import { useNavigate, useParams } from "react-router-dom";
import CityWeatherBridgeDetails from "../components/BridgeDetails";
import type { TempUnit } from "../App";

type Props = {
  unit: TempUnit;
};

export default function More({ unit }: Props) {
  const navigate = useNavigate();
  const { cityName } = useParams();

  if (!cityName) {
    return (
      <div className="app-container">
        <p>Brak miasta w adresie.</p>
        <button onClick={() => navigate("/")}>Powrót</button>
      </div>
    );
  }

  const decodedCityName = decodeURIComponent(cityName);

  return (
    <div className="app-container">
      <h2>{decodedCityName}</h2>

      <CityWeatherBridgeDetails cityName={decodedCityName} unit={unit} />

      <button onClick={() => navigate("/")}>Powrót</button>
    </div>
  );
}

