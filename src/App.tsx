import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import More from "./pages/More";

function App() {
  const [cities, setCities] = useState<string[]>([]);

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
      <Route path="/" element={<Home cities={cities} addCity={addCity} removeCity={removeCity} />} />
      <Route path="/more/:cityName" element={<More />} />
    </Routes>
  );
}

export default App;
