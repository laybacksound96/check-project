function getRandomPastelColor(ContentName: string): string {
  let minSaturation = 20; // 최소 채도 (0 ~ 100)
  let maxSaturation = 40; // 최대 채도 (0 ~ 100)
  let minLightness = 30; // 최소 명도 (0 ~ 100)
  let maxLightness = 60; // 최대 명도 (0 ~ 100)

  let hue = Math.floor(Math.random() * 360); // 0 ~ 359 사이의 랜덤한 색상
  if (ContentName === "아브렐슈드") hue = 240;
  if (ContentName === "발탄") hue = 180;
  if (ContentName === "비아키스") hue = 300;
  if (ContentName === "쿠크세이튼") hue = 0;
  if (ContentName === "일리아칸") hue = 134;
  if (ContentName === "아르고스") {
    hue = 203;
    maxSaturation = 25;
    minLightness = 20;
    maxLightness = 30;
  }

  const saturation = Math.floor(
    Math.random() * (maxSaturation - minSaturation + 1) + minSaturation
  );
  const lightness = Math.floor(
    Math.random() * (maxLightness - minLightness + 1) + minLightness
  );

  const hslColor = "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";

  return hslColor;
}

export default getRandomPastelColor;
