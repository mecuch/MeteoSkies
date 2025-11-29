import "./App.css";
import { useState } from "react";
import type { City } from "./data/cities";
import { CITIES } from "./data/cities";
import Header from "./components/Header";
import SelectCity from "./components/SelectCity";
import Corpse from "./components/Corpse";

function App() {
  const [favoriteCities, setFavoriteCities] = useState<City[]>([]);

  const handleAddCity = (id: number) => {
    const city = CITIES.find((c) => c.id === id);
    if (!city) return;
    
    setFavoriteCities((prev) =>
      prev.some((c) => c.id === city.id) ? prev : [...prev, city]
    );
  };

  return (
    <div className="app-container">
      <Header />
      <SelectCity onSelectCity={handleAddCity} />
      <Corpse cities={favoriteCities} />
      <h2>status aktualziacji pogody</h2>
    </div>
  );
}

export default App;
