import { useState } from "react";
import GeoCoder from "./GeocodingCity";
import WeatherTemperature from "./WeatherMainTemp";

type Props = {
  cityName: string;
};

export default function CityWeatherBridge({ cityName }: Props){
    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
    return(
        <div>
            <GeoCoder cityName={cityName} onResolved={setCoords} />
            <WeatherTemperature latitude={coords?.latitude} longitude={coords?.longitude} />
        </div>
    )
}