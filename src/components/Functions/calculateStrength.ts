function calculateStrength(array: string[]) {
  const totalLength = array.length;
  const normalCount = array.filter((item) => item === "normal").length;
  const hardCount = array.filter((item) => item === "hard").length;
  if (normalCount === 0 && hardCount > 0) {
    return 100;
  } else if (normalCount === totalLength) {
    return 0;
  } else {
    const normalRatio = normalCount / totalLength;
    return Math.round((1 - normalRatio) * 100);
  }
}
export default calculateStrength;
