import Header from "../components/Header";
import Textfield from "../components/Textfield";
import Corpse from "../components/Corpse";

type Props = {
  cities: string[];
  addCity: (city: string) => void;
  removeCity: (city: string) => void;
};

export default function Home({ cities, addCity, removeCity }: Props) {
  
  return (
    <div className="app-container">
      <Header />
      <Textfield onAddCity={addCity} />
      <Corpse cities={cities} onRemoveCity={removeCity} />
    </div>
  );
}
