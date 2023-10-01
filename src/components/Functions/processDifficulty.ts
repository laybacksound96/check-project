import { IGate } from "../../atoms/data";

function processDifficulty(gate: IGate[]): string[] {
  let result = [];
  let LeftNo = 1;
  let LeftDiff = gate[0].difficulty;
  let CurrentNo;
  for (let i in gate) {
    if (!gate[i].isVisible) continue;
    const RightDiff = gate[i].difficulty;
    CurrentNo = +i + 1;
    if (LeftDiff !== RightDiff) {
      const PreNo = +i;
      result.push(
        LeftNo === PreNo
          ? `${LeftDiff} ${LeftNo}`
          : `${LeftDiff} ${LeftNo}-${PreNo}`
      );
      LeftDiff = RightDiff;
      LeftNo = +i + 1;
    }
  }
  result.push(
    LeftNo === CurrentNo
      ? `${LeftDiff} ${LeftNo}`
      : `${LeftDiff} ${LeftNo}-${CurrentNo}`
  );
  return result;
}
export default processDifficulty;
