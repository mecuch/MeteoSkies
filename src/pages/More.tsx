import { useNavigate, useParams } from "react-router-dom";
import CityWeatherBridge from "../components/Bridge";

export default function More() {
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

      <CityWeatherBridge cityName={decodedCityName} />

      <button onClick={() => navigate("/")}>Powrót</button>
    </div>
  );
}

