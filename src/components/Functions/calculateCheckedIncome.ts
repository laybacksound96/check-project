import { ICommander } from "../../atoms/commander";
import { IContent, ICheck } from "../../atoms/data";

const calculateCheckedIncome = (
  goldContents: IContent[],
  commanderData: ICommander[],
  checks: ICheck[],
  CharacterName: string
) => {
  let gold = 0;
  goldContents.forEach(({ contentName, gateSetting }) => {
    const isChecked = checks.find(
      ({ characterName: char, contentName: cont }) =>
        CharacterName === char && contentName === cont
    );
    const name = contentName;
    const difficulty = gateSetting
      .filter(({ isVisible }) => isVisible === true)
      .map(({ difficulty }) => difficulty);

    const commander = commanderData.find(
      ({ name: commanderName }) => commanderName === name
    );
    if (!commander) return;
    difficulty.forEach((difficulty, index) => {
      const gate = commander.data.find(
        ({ difficulty: diff }) => difficulty === diff
      );
      if (!gate || !isChecked) return;
      gold += gate.gates[index].gold;
    });
  });
  return gold;
};
export default calculateCheckedIncome;
