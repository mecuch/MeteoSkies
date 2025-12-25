import { useState } from "react";
import GeoCoder from "./GeocodingCity";
import WeatherTemperature from "./WeatherMainTemp";
import type { TempUnit } from "../App";

type Props = {
  cityName: string;
  unit: TempUnit
};

export default function CityWeatherBridge({ cityName, unit }: Props){
    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
    return(
        <div>
            <GeoCoder cityName={cityName} onResolved={setCoords} />
            <WeatherTemperature latitude={coords?.latitude} longitude={coords?.longitude} unit={unit} />
        </div>
    )
}