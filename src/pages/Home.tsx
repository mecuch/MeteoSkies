import Header from "../components/Header";
import Textfield from "../components/Textfield";
import Corpse from "../components/Corpse";
import type { TempUnit } from "../App";

type Props = {
  cities: string[];
  addCity: (city: string) => void;
  removeCity: (city: string) => void;
  unit: TempUnit
};

export default function Home({ cities, addCity, removeCity, unit }: Props) {
  
  return (
    <div className="app-container">
      <Header />
      <Textfield onAddCity={addCity} />
      <Corpse cities={cities} onRemoveCity={removeCity} unit={unit} />
    </div>
  );
}
