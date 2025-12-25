import "./Textfield.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  onAddCity: (city: string) => void;
  TranslCity: string;
};

export default function Textfield({ onAddCity}: Props) {
  
  const [value, setValue] = useState("");
  const navigate = useNavigate();
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
      <button onClick={() => navigate(`/Settings`)} className="textfield-button">
        Ustawienia
      </button>
    </div>
  );
}