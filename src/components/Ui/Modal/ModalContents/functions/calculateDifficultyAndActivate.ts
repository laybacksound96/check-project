import commander from "./commander.json";
interface resultObject {
  ["isActivated"]: boolean;
  ["Difficulty"]: string;
}
interface commanderInfo {
  gateNumber: number;
  level: number;
  gold: number;
}
export interface IGates {
  [difficulty: string]: commanderInfo;
}
export interface IData {
  [name: string]: IGates[];
}

const calculateDifficultyAndActivate = (
  level: number,
  content: string,
  gateNumber: number
): resultObject => {
  const result: resultObject = {
    isActivated: false,
    Difficulty: "normal",
  };
  const commanderData: IData = commander;
  const gateData: IGates = commanderData[content][gateNumber - 1];
  for (let difficulty in gateData) {
    if (level >= gateData[difficulty].level) {
      result.isActivated = true;
      result.Difficulty = difficulty;
    }
  }
  return result;
};

export default calculateDifficultyAndActivate;
