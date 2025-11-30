import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Textfield from "./components/Textfield";
import Corpse from "./components/Corpse";

function App() {
   const [cities, setCities] = useState<string[]>([]);

  const addCity = (city: string) => {
    if (!city.trim()) return;
    setCities((prev) => [...prev, city]);
  };

  return (
    <div className="app-container">
      <Header />
      <Textfield onAddCity={addCity} />
      <Corpse cities={cities} />
      <h2>status aktualziacji pogody</h2>
    </div>
  );
}

export default App;
