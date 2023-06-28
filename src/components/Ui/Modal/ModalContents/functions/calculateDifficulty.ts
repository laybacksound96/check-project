import commander from "./commander.json";
import { IData, IGates } from "../../../../../json/commanderTypes";

const calculateDifficulty = (
  level: number,
  content: string,
  gateNumber: number
): string => {
  const commanderData: IData = commander;
  const gateData: IGates = commanderData[content][gateNumber];
  let currentDifficulty = "normal";
  for (let DifficultyName in gateData) {
    const requiredLevel = gateData[DifficultyName].level;
    if (level >= requiredLevel) {
      currentDifficulty = DifficultyName;
    }
  }

  return currentDifficulty;
};

export default calculateDifficulty;
