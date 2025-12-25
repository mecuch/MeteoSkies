import { useState } from "react";
import type { TempUnit } from "../App";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

type Props = {
  unit: TempUnit;
  onSaveUnit: (u: TempUnit) => void;
};

export default function Settings({ unit, onSaveUnit }: Props) {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<TempUnit>(unit);

  return (
    <div className="app-container settings">
      <h2 className="settings-title">Ustawienia</h2>

      <div className="settings-units">
        <label className="settings-radio">
          <input
            type="radio"
            name="unit"
            checked={draft === "°C"}
            onChange={() => setDraft("°C")}
          />
          <span>°C</span>
        </label>

        <label className="settings-radio">
          <input
            type="radio"
            name="unit"
            checked={draft === "°F"}
            onChange={() => setDraft("°F")}
          />
          <span>°F</span>
        </label>
      </div>

      <div className="settings-actions">
        <button
          type="button"
          className="settings-button primary"
          onClick={() => {
            onSaveUnit(draft);
            navigate("/");
          }}
        >
          Zapisz
        </button>

        <button
          type="button"
          className="settings-button secondary"
          onClick={() => navigate("/")}
        >
          Anuluj
        </button>
      </div>
    </div>
  );
}
