import { useState } from "react";
import GeoCoder from "./GeocodingCity";
import WeatherDetails from "./WeatherDetailsTemp";

type Props = {
  cityName: string;
};

export default function CityWeatherBridgeDetails({ cityName }: Props){
    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
    return(
        <div>
            <GeoCoder cityName={cityName} onResolved={setCoords} />
            <WeatherDetails latitude={coords?.latitude} longitude={coords?.longitude} />
        </div>
    )
}