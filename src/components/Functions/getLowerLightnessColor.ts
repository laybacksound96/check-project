const getLowerLightnessColor = (hsl: string, number: number): string => {
  const colorString = hsl;

  const startIndex = colorString.lastIndexOf(",") + 1; // 변경할 숫자의 시작 인덱스
  const endIndex = colorString.lastIndexOf("%"); // 변경할 숫자의 마지막 인덱스

  const lightnessNumber = parseInt(colorString.substring(startIndex, endIndex));

  const newColorString =
    colorString.substring(0, startIndex) +
    (lightnessNumber - number) +
    colorString.substring(endIndex);
  return newColorString;
};

export default getLowerLightnessColor;
