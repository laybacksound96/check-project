import { ICommander } from "../../atoms/commander";
import { IContent } from "../../atoms/data";

const calculateIncome = (
  goldContents: IContent[],
  commanderData: ICommander[]
): number => {
  let gold = 0;
  for (let i in goldContents) {
    const { contentName, gateSetting, isVisble } = goldContents[i];
    if (!isVisble) continue;
    const name = contentName;
    const difficulty = gateSetting
      .filter(({ isVisible }) => isVisible === true)
      .map(({ difficulty }) => difficulty);
    const commander = commanderData.find(
      ({ name: commanderName }) => commanderName === name
    );
    if (!commander) continue;
    for (let j in difficulty) {
      const gate = commander.data.find(
        ({ difficulty: diff }) => difficulty[j] === diff
      );
      if (!gate) continue;
      gold += gate.gates[j].gold;
    }
  }
  return gold;
};
export default calculateIncome;
