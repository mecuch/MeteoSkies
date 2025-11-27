import "./Textfield.css";
import { useState } from "react";

type Props = {
  onAddCity: (city: string) => void;
};

export default function Textfield({ onAddCity }: Props) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    onAddCity(value);
    setValue("");
  };

  return (
    <div className="textfield-container">
      <input
        type="text"
        placeholder="Wpisz miasto..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="textfield-input"
      />
      <button onClick={handleAdd} className="textfield-button">
        Dodaj
      </button>
    </div>
  );
}