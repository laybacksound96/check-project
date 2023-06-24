import commander from "./commander.json";
import { IData } from "./calculateDifficultyAndActivate";

const IsValidLevel = (ContentName: string, userLevel: number) => {
  const commanderData: IData = commander;
  const { level: commaderLevel } = commanderData[`${ContentName}`][0]["normal"];
  if (userLevel >= commaderLevel) {
    return true;
  }
  return false;
};

export default IsValidLevel;
