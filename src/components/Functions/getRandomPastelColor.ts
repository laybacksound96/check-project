import { IGate } from "../../atoms/data";
import calculateStrength from "./calculateStrength";

function getRandomPastelColor(
  ContentName: string,
  gateSetting: IGate[]
): string {
  let hue = Math.floor(Math.random() * 360);

  const strength =
    calculateStrength(gateSetting.map(({ difficulty }) => difficulty)) * 0.2;

  if (ContentName === "아르고스" || ContentName === "상아탑") {
    hue = 203;
  }
  if (ContentName === "아브렐슈드") hue = 262;
  if (ContentName === "발탄") hue = 180;
  if (ContentName === "비아키스") hue = 300;
  if (ContentName === "쿠크세이튼") hue = 0;
  if (ContentName === "일리아칸") hue = 134;
  if (ContentName === "카양겔") {
    hue = 51;
  }
  if (ContentName === "카멘") hue = 240;
  const lightness = 60 - strength;
  const saturation = 40 + strength;
  const hslColor = "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";

  return hslColor;
}

export default getRandomPastelColor;
