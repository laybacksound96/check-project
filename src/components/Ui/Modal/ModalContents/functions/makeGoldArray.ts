import CountGates from "./CountGates";
import IsValidLevel from "./IsValidLevel";
import calculateDifficultyAndActivate, {
  IData,
} from "./calculateDifficultyAndActivate";

function makeGoldArray(level: number, commanderData: IData) {
  const result = [];
  for (let CommanderName in commanderData) {
    if (!IsValidLevel(CommanderName, level)) continue;
    const gates = commanderData[CommanderName];
    const { Difficulty } = calculateDifficultyAndActivate(
      level,
      CommanderName,
      CountGates(CommanderName)
    );
    let TotalGold = 0;
    for (let index in gates) {
      const { gold, level: gateLevel } = gates[index][Difficulty];
      if (gateLevel > level) continue;
      TotalGold += gold;
    }
    const goldDate = { CommanderName, TotalGold };
    result.push(goldDate);
  }
  result.sort((a, b) => b.TotalGold - a.TotalGold);
  return result;
}
export default makeGoldArray;
