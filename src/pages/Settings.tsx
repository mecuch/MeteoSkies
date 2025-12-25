import type { TempUnit } from "../App";
import "./Settings.css"
import { useNavigate } from "react-router-dom";

type Props = {
  unit: TempUnit;
  onChangeUnit: (u: TempUnit) => void;
};

export default function Settings({ unit, onChangeUnit }: Props) {
  const navigate = useNavigate()
  return (
    <div className="app-container">
      <h2>Ustawienia</h2>

      <div>
        <label>
          <input
            type="radio"
            name="unit"
            checked={unit === "°C"}
            onChange={() => onChangeUnit("°C")}
          />
          Celsjusz (°C)
        </label>

        <label style={{ marginLeft: "1rem" }}>
          <input
            type="radio"
            name="unit"
            checked={unit === "°F"}
            onChange={() => onChangeUnit("°F")}
          />
          Fahrenheit (°F)
        </label>
      </div>
      <button onClick={() => navigate("/")}>Powrót</button>
    </div>
  );
}
