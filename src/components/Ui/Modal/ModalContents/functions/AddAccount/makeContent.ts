import { ICharacters } from "../../../../../../atoms/data";
import { CommanderData } from "../../../../../../json/CommanderData";
import calculateGold from "./calculateGold";
import makeGates from "./makeGates";

const makeContent = (characters: ICharacters[]) => {
  const contentsOrder: string[] = [];
  const commanderData = CommanderData;
  for (let i in characters) {
    const { level, contents } = characters[i];
    const goldArray = calculateGold(level, CommanderData);
    goldArray.forEach((elem) => {
      if (!contentsOrder.includes(elem)) {
        contentsOrder.push(elem);
      }
    });
    for (let j in commanderData) {
      const { contentName, gates } = commanderData[j];
      contents.push({
        contentName,
        isVisible: goldArray.includes(contentName),
        isGoldContents: goldArray.includes(contentName),
        gates: makeGates(level, gates),
      });
    }
  }
  return { characters, contentsOrder };
};

export default makeContent;
