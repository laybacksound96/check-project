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
  content:
    | "발탄"
    | "비아키스"
    | "쿠크세이튼"
    | "아브렐슈드"
    | "일리아칸"
    | "아르고스",
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
