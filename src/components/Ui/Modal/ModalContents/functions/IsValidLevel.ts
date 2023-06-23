import commander from "./commander.json";
import { IData } from "./calculateDifficultyAndActivate";

const IsValidLevel = (ContentName: string, level: number) => {
  const commanderData: IData = commander;
  if (level >= commanderData[`${ContentName}`][0]["normal"].level) {
    return true;
  }
  return false;
};

export default IsValidLevel;
