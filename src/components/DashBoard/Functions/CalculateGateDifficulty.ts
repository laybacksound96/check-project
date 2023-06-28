import { IGates } from "../../../atoms/Settings/ContentSetting";

function CalculateGateDifficulty(gate: IGates[]): string[] {
  let result = [];
  let LeftNo = gate[0].Gate_No;
  let LeftDiff = gate[0].Difficulty;
  let CurrentNo;
  for (let i in gate) {
    if (!gate[i].isVisible) continue;
    const RightDiff = gate[i].Difficulty;
    CurrentNo = gate[i].Gate_No;
    if (LeftDiff !== RightDiff) {
      const PreNo = gate[+i - 1].Gate_No;
      result.push(
        LeftNo === PreNo
          ? `${LeftDiff} ${LeftNo}`
          : `${LeftDiff} ${LeftNo}-${PreNo}`
      );
      LeftDiff = RightDiff;
      LeftNo = gate[i].Gate_No;
    }
  }
  result.push(
    LeftNo === CurrentNo
      ? `${LeftDiff} ${LeftNo}`
      : `${LeftDiff} ${LeftNo}-${CurrentNo}`
  );
  return result;
}
export default CalculateGateDifficulty;
