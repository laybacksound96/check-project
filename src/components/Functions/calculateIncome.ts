import { ICommander } from "../../atoms/commander";
import { IContent } from "../../atoms/data";

const calculateIncome = (
  goldContents: IContent[],
  commanderData: ICommander[]
): number => {
  let gold = 0;
  const mappedContents = goldContents.map(({ contentName, gateSetting }) => {
    return { contentName, gateSetting };
  });
  for (let i in mappedContents) {
    const { contentName, gateSetting } = mappedContents[i];
    const commander = commanderData.find(({ name }) => contentName === name);
    if (!commander) continue;
    for (let j in gateSetting) {
      const { difficulty: diff, isVisible } = gateSetting[j];
      const commanderData = commander.data.find(
        ({ difficulty }) => difficulty === diff
      );
      if (!isVisible || !commanderData) continue;
      gold += commanderData.gates[j].gold;
    }
  }
  return gold;
};
export default calculateIncome;
