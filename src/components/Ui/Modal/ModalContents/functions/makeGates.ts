import CountGates from "./CountGates";
import calculateDifficulty from "./calculateDifficulty";
import commander from "../../../../../json/commander.json";
import { IData } from "../../../../../json/commanderTypes";
import { IGatesSetting } from "../../../../../atoms/Settings/Gates";
function isActivated(level: number, content: string, gateNumber: number) {
  const commanderData: IData = commander;
  const commaderLevel = commanderData[content][gateNumber]["normal"].level;
  if (level < commaderLevel) return false;
  return true;
}
function makeGates(content: string, level: number): IGatesSetting[] {
  const Gates: IGatesSetting[] = [];
  const gateCount = CountGates(content);

  for (let gateNumber = 0; gateNumber < gateCount; gateNumber++) {
    const Difficulty = calculateDifficulty(level, content, gateNumber);
    const Gate: IGatesSetting = {
      Gate_No: gateNumber + 1,
      isActivated: isActivated(level, content, gateNumber),
      Difficulty,
      isFixedDifficulty: Difficulty === "normal" ? true : false,
      isVisible: isActivated(level, content, gateNumber),
    };
    Gates.push(Gate);
  }
  return Gates;
}

export default makeGates;
