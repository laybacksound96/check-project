import { IGates } from "../../../../../atoms/userSetting";
import CountGates from "./CountGates";
import calculateDifficultyAndActivate from "./calculateDifficultyAndActivate";

function makeGates(content: string, level: number): IGates[] {
  const Gates: IGates[] = [];
  const gateCount = CountGates(content);

  for (let gateNumber = 0; gateNumber < gateCount; gateNumber++) {
    const { isActivated, Difficulty } = calculateDifficultyAndActivate(
      level,
      content,
      gateNumber
    );
    const Gate: IGates = {
      Gate_No: gateNumber + 1,
      isActivated,
      Difficulty,
      isFixedDifficulty: Difficulty === "normal" ? true : false,
      isVisible: isActivated,
    };
    Gates.push(Gate);
  }
  return Gates;
}

export default makeGates;
