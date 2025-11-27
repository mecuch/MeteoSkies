
import "./Corpse.css";
type Props = {
  cities: string[];
};

export default function CityBody({ cities }: Props) {
  return (
    <div className="city-body">
      <ul>
        {cities.map((city, index) => (
          <li key={index}>{city}</li>
        ))}
      </ul>
    </div>
  );
}