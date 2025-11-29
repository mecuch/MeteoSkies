
export type City = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

export const CITIES = [
  { id: 1, name: "Warszawa", latitude: 52.2297, longitude: 21.0122 },
  { id: 2, name: "Kraków",   latitude: 50.0647, longitude: 19.9450 },
  { id: 3, name: "Gdańsk",   latitude: 54.3520, longitude: 18.6466 },
  { id: 4, name: "Wrocław",  latitude: 51.1079, longitude: 17.0385 },
  { id: 5, name: "Poznań",   latitude: 52.4064, longitude: 16.9252 },
];