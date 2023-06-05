import commander from "./commander.json";
interface resultObject {
  ["isActivated"]: boolean;
  ["Difficulty"]?: string;
}
interface commanderInfo {
  gateNumber: number;
  level: number;
  gold: number;
}
interface commaderNames {
  [difficulty: string]: commanderInfo;
}
interface IData {
  [name: string]: commaderNames[];
}
export const makeAvailableDifficulty = (
  level: number,
  content: string,
  gateNumber: number
): resultObject => {
  const resultDifficulty: resultObject = {
    isActivated: false,
    Difficulty: "normal",
  };
  const commanderData: IData = commander;
  const gateData = commanderData[content][gateNumber - 1];
  for (let difficulty in gateData) {
    if (level >= gateData[difficulty].level) {
      resultDifficulty.isActivated = true;
      resultDifficulty.Difficulty = difficulty;
    }
  }
  return resultDifficulty;
};

export default makeAvailableDifficulty;