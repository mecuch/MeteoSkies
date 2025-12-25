import type { TempUnit } from "../App";

export function toDisplayTemp(valueC: number, unit: TempUnit): number {
  return unit === "°F" ? valueC * 9 / 5 + 32 : valueC;
}

export function unitLabel(unit: TempUnit): string {
  return unit === "°F" ? "°F" : "°C";
}
