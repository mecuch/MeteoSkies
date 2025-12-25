import "./App.css";
import { useState, useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import More from "./pages/More";
import Settings from "./pages/Settings";

export type TempUnit = "°C" | "°F";

const LS_FAVS = "meteoskies:favorites";
const LS_UNIT = "meteoskies:unit";

function loadFavorites(): string[] {
  try {
    const raw = localStorage.getItem(LS_FAVS);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((x) => typeof x === "string")
      : [];
  } catch {
    return [];
  }
}

function loadUnit(): TempUnit {
  const u = localStorage.getItem(LS_UNIT);
  return u === "°F" ? "°F" : "°C";
}

function App() {
  const [cities, setCities] = useState<string[]>(() => loadFavorites());
  const [unit, setUnit] = useState<TempUnit>(loadUnit);
  const [favorites, setFavorites] = useState<string[]>(loadFavorites);

  const addCity = (city: string) => {
    const trimmed = city.trim();
    if (!trimmed) return;
    setCities((prev) => [...prev, trimmed]);
  };

  const removeCity = (cityToRemove: string) => {
  setCities(prev => prev.filter(city => city !== cityToRemove));
  setFavorites((prev) => prev.filter((c) => c !== cityToRemove));
};

 // zapis tylko ulubionych (automatycznie po zmianie)
  useEffect(() => {
    localStorage.setItem(LS_FAVS, JSON.stringify(favorites));
  }, [favorites]);

  // zmiana unitów ma się zapisać dopiero po "Zapisz" -> zrobimy to w handlerze
  const saveUnit = (u: TempUnit) => {
    setUnit(u);
    localStorage.setItem(LS_UNIT, u);
  };

  const toggleFavorite = (city: string) => {
    setFavorites((prev) => (prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]));
  };

  // wygodna mapa do sprawdzania serduszka
  const favSet = useMemo(() => new Set(favorites), [favorites]);

  return (
    <Routes>
      <Route path="/" element={<Home cities={cities}
      addCity={addCity}
      removeCity={removeCity}
      unit={unit}
      toggleFavorite={toggleFavorite}
      favSet={favSet} />} />
      <Route path="/more/:cityName" element={<More unit={unit}/>} />
      <Route path="/settings"
      element={<Settings unit={unit} onSaveUnit={saveUnit} />} />
    </Routes>
  );
}

export default App;
