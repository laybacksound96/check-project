function processDifficulty(inputArray: string[]): string[] {
  if (inputArray.length === 0) {
    return [""];
  } else if (inputArray.length === 1) {
    return inputArray;
  }

  let result = [];
  let currentType = inputArray[0];
  let count = 1;
  let firstCount = 1;
  for (let i = 1; i < inputArray.length; i++) {
    if (inputArray[i] === currentType) {
      count++;
    } else {
      if (count === 1) {
        result.push(`${currentType} ${i}`);
      } else {
        result.push(`${currentType} ${firstCount}-${i}`);
      }
      currentType = inputArray[i];
      firstCount = i + 1;
    }
  }
  if (count === 1) {
    result.push(`${currentType} ${inputArray.length}`);
  } else {
    result.push(`${currentType} ${firstCount}-${inputArray.length}`);
  }

  return result;
}
export default processDifficulty;
