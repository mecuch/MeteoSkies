import "./Textfield.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type GeoResult = {
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
};

type Props = {
  onAddCity: (city: string) => void;
  TranslCity?: string;
};

export default function Textfield({ onAddCity }: Props) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<GeoResult[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const datalistId = useMemo(() => "geo-cities", []);

  useEffect(() => {
    const q = value.trim();

    if (q.length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const t = setTimeout(() => {
      const url =
        `https://geocoding-api.open-meteo.com/v1/search` +
        `?name=${encodeURIComponent(q)}` +
        `&count=8` +
        `&language=pl` +
        `&format=json`;

      fetch(url)
        .then((r) => r.json())
        .then((data) => {
          const results: GeoResult[] = Array.isArray(data?.results)
            ? data.results
            : [];
          setSuggestions(results);
          setLoading(false);
        })
        .catch(() => {
          setSuggestions([]);
          setLoading(false);
        });
    }, 300); // debounce

    return () => clearTimeout(t);
  }, [value]);

  const handleAdd = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    onAddCity(trimmed);
    setValue("");
    setSuggestions([]);
  };

  return (
    <div className="textfield-container">
      <input
        type="text"
        list={datalistId}
        placeholder="Wpisz miasto..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="textfield-input"
      />

      <datalist id={datalistId}>
        {suggestions.map((r) => {
          const label = [r.name, r.admin1, r.country].filter(Boolean).join(", ");
          return (
            <option
              key={`${r.name}-${r.latitude}-${r.longitude}`}
              value={r.name}
              label={label}
            />
          );
        })}
      </datalist>

      <button
        onClick={handleAdd}
        className="textfield-button"
        disabled={loading}
        title={loading ? "Pobieram podpowiedzi..." : "Dodaj miasto"}
      >
        {loading ? "Szukam…" : "Dodaj"}
      </button>

      <button
        onClick={() => navigate("/settings")}
        className="textfield-button"
      >
        Ustawienia
      </button>
    </div>
  );
}
