import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import More from "./pages/More";
import Settings from "./pages/Settings";

export type TempUnit = "°C" | "°F";

function App() {
  const [cities, setCities] = useState<string[]>([]);
  const [unit, setUnit] = useState<TempUnit>("°C");

  const addCity = (city: string) => {
    const trimmed = city.trim();
    if (!trimmed) return;
    setCities((prev) => [...prev, trimmed]);
  };

  const removeCity = (cityToRemove: string) => {
  setCities(prev => prev.filter(city => city !== cityToRemove));
};

  return (
    <Routes>
      <Route path="/" element={<Home cities={cities} addCity={addCity} removeCity={removeCity} unit={unit} />} />
      <Route path="/more/:cityName" element={<More unit={unit}/>} />
      <Route path="/settings" element={<Settings unit={unit} onChangeUnit={setUnit} />} />
    </Routes>
  );
}

export default App;
