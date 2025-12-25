import { useState } from "react";
import GeoCoder from "./GeocodingCity";
import WeatherDetails from "./WeatherDetailsTemp";
import Forecast5Days from "./Forecast5Days";
import type { TempUnit } from "../App";

type Props = {
  cityName: string;
  unit: TempUnit
};

export default function CityWeatherBridgeDetails({ cityName, unit }: Props){
    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
    return(
        <div>
            <GeoCoder cityName={cityName} onResolved={setCoords} />
            <WeatherDetails latitude={coords?.latitude} longitude={coords?.longitude} unit={unit} />
            <Forecast5Days latitude={coords?.latitude} longitude={coords?.longitude} unit={unit} />
        </div>
    )
}