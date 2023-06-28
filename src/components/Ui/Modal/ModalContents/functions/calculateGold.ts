import { IData } from "../../../../../json/commanderTypes";
import commander from "../../../../../json/commander.json";
import { IGates } from "../../../../../atoms/Settings/Gates";

function calculateGold(ContentsName: string, Gates: IGates[]): number {
  const commanderData: IData = commander;
  let gold = 0;
  for (let index in Gates) {
    const { Gate_No, Difficulty, isVisible } = Gates[index];
    if (!isVisible) continue;
    const gateGold = commanderData[ContentsName][Gate_No - 1][Difficulty].gold;
    gold += gateGold;
  }
  return gold;
}
export default calculateGold;
