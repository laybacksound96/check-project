import { IGates } from "../../../../../atoms/userSetting";
import CountGates from "./CountGates";
import makeActivatedAndDifficulty from "./makeActivatedAndDifficulty";

function makeGates(content: string, level: number): IGates[] {
  const Gates: IGates[] = [];
  const gateCount = CountGates(content) + 1;

  for (let gateNumber = 1; gateNumber < gateCount; gateNumber++) {
    const { isActivated, Difficulty } = makeActivatedAndDifficulty(
      level,
      content,
      gateNumber
    );
    const Gate: IGates = {
      Gate_No: gateNumber,
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
