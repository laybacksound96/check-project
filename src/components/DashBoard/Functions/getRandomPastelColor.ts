function getRandomPastelColor(): string {
  const minLightness = 30; // 최소 명도 (0 ~ 100)
  const maxLightness = 60; // 최대 명도 (0 ~ 100)
  const minSaturation = 20; // 최소 채도 (0 ~ 100)
  const maxSaturation = 40; // 최대 채도 (0 ~ 100)

  const hue = Math.floor(Math.random() * 360); // 0 ~ 359 사이의 랜덤한 색상
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
