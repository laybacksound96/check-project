import { IGates } from "../../../../../atoms/userSetting";
import CountGates from "./CountGates";
import calculateDifficulty from "./calculateDifficulty";
import commander from "./commander.json";
import { IData } from "./commanderTypes";
function isActivated(level: number, content: string) {
  const commanderData: IData = commander;
  const commaderLevel = commanderData[content][0]["normal"].level;
  if (level < commaderLevel) return false;
  return true;
}
function makeGates(content: string, level: number): IGates[] {
  const Gates: IGates[] = [];
  const gateCount = CountGates(content);

  for (let gateNumber = 0; gateNumber < gateCount; gateNumber++) {
    const Difficulty = calculateDifficulty(level, content, gateNumber);
    const Gate: IGates = {
      Gate_No: gateNumber + 1,
      isActivated: isActivated(level, content),
      Difficulty,
      isFixedDifficulty: Difficulty === "normal" ? true : false,
      isVisible: isActivated(level, content),
    };
    Gates.push(Gate);
  }
  return Gates;
}

export default makeGates;
