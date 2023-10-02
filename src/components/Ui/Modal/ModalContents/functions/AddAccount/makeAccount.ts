import { IAccounts, ICharacters } from "../../../../../../atoms/data";
import { CommanderData } from "../../../../../../json/CommanderData";
import { IFetchedCharacter } from "../../AddAccount";
import calculateGold from "./calculateGold";
import makeGates from "./makeGates";

const makeDataResult = (data: IFetchedCharacter[]): IAccounts => {
  const characterOrder: string[] = [];
  const contentsOrder: string[] = [];
  const characters: ICharacters[] = [];
  const commanderData = CommanderData;
  for (let i in data) {
    const {
      ServerName: serverName,
      ItemMaxLevel,
      CharacterName: characterName,
      CharacterClassName: className,
    } = data[i];
    characters.push({
      characterName,
      className,
      level: parseInt(ItemMaxLevel.replace(",", "")),
      serverName,
      contents: [],
    });
    if (+i < 6) characterOrder.push(characterName);
  }

  for (let i in characters) {
    const { level, contents, characterName } = characters[i];
    const goldArray = calculateGold(level, CommanderData);
    if (characterOrder.includes(characterName)) {
      goldArray.forEach((elem) => {
        if (!contentsOrder.includes(elem)) contentsOrder.push(elem);
      });
      contentsOrder.reverse();
    }
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
  return {
    characterOrder,
    characters,
    contentsOrder,
    checks: [],
  };
};
export default makeDataResult;
