import "./SelectCity.css";
import { useState } from "react";
import { CITIES } from "../data/cities";

type Props = {
    onSelectCity: (cityID: number) => void
}

export default function SelectCity({ onSelectCity }: Props) {
    const [selected, setSelect] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setSelect(e.target.value);
    onSelectCity(id);
  };
  
  return (
    <div className="city-select-container">
      <select value={selected} onChange={handleChange} className="city-select">
        <option value="">Wybierz miasto...</option>
        {CITIES.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}