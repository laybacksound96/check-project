import { IFetchedCharacter } from "../components/Ui/Modal/ModalContents/AddAccount";
import { ICommanderData, commanderData } from "../json/commanderTypes";

const calculateGold = (level: number, commanderData: ICommanderData[]) => {
  let goldContents = [];
  for (let i in commanderData) {
    let gold = 0;
    const { gates, contentName } = commanderData[i];
    for (let gateNumber in gates) {
      const gate = gates[gateNumber];
      if (gate[0].level > level) continue;
      if (gate.length === 1) {
        gold += gate[0].gold;
      } else {
        if (gate[1].level <= level) {
          gold += gate[1].gold;
        } else {
          gold += gate[0].gold;
        }
      }
    }
    goldContents.push({ contentName, gold });
  }
  return goldContents
    .sort((a, b) => b.gold - a.gold)
    .slice(0, 3)
    .map((elem) => elem.contentName);
};

interface IAccounts {
  characterOrder: string[];
  contentsOrder: string[];
  characters: ICharacters[];
  checks: {
    contentName: string;
    characterName: string;
  }[];
}
interface ICharacters {
  CharacterName: string;
  ItemMaxLevel: number;
  ServerName: string;
  CharacterClassName: string;
  contents: {
    name: string;
    info: {
      isGoldContents: boolean;
      gateSetting: {
        isVisible: boolean;
        difficulty: string;
      }[];
    };
    isVisble: boolean;
  }[];
}
const makeDataResult = (data: IFetchedCharacter[]): IAccounts => {
  const characterOrder: string[] = [];
  const contentsOrder: string[] = [];
  const characters: ICharacters[] = [];
  for (let i in data) {
    const { ServerName, ItemMaxLevel, CharacterName, CharacterClassName } =
      data[i];
    characters.push({
      ServerName,
      CharacterName,
      ItemMaxLevel: parseInt(ItemMaxLevel.replace(",", "")),
      CharacterClassName,
      contents: [],
    });
    if (+i < 6) characterOrder.push(CharacterName);
  }
  for (let i in characters) {
    const { CharacterName, contents, ItemMaxLevel } = characters[i];
    const goldArray = calculateGold(ItemMaxLevel, commanderData);
    if (characterOrder.includes(CharacterName)) {
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
