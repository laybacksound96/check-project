import { IGates } from "../../../../../../atoms/data";
import {
  CommanderData,
  ICommanderData,
} from "../../../../../../json/CommanderData";
import { IFetchedCharacter } from "../../AddAccount";
import SortByLevel from "../SortByLevel";
import makeNewContentOrder from "../makeNewContentOrder";
import calculateGold from "./calculateGold";
import makeGates from "./makeGates";

function makeContents(level: number, commanderData: ICommanderData[]) {
  const goldArray = calculateGold(level, CommanderData);

  return commanderData.map(({ contentName, gates }): IContents => {
    return {
      contentName,
      gates: makeGates(level, gates),
      isGoldContents: goldArray.includes(contentName),
    };
  });
}

function makeCharacter(
  data: IFetchedCharacter,
  commanderData: ICommanderData[]
): ICharacter {
  const {
    ServerName: serverName,
    ItemMaxLevel,
    CharacterName: characterName,
    CharacterClassName: className,
  } = data;
  const level = parseInt(ItemMaxLevel.replace(",", ""));

  return {
    characterName,
    className,
    level,
    serverName,
    contents: makeContents(level, commanderData),
  };
}

interface ICharacter {
  characterName: string;
  className: string;
  level: number;
  serverName: string;
  contents: IContents[];
}
interface IContents {
  contentName: string;
  isGoldContents: boolean;
  gates: IGates[];
}
function makeContentOrder(array: string[][]): string[] {
  const result: string[] = [];
  for (const subArray of array) {
    for (const item of subArray) {
      if (!result.includes(item)) {
        result.push(item);
      }
    }
  }

  return result;
}
const makeDataResult = (data: IFetchedCharacter[]) => {
  const userData = SortByLevel(data);
  const characterOrder: string[] = [];
  const contentsOrder: string[] = [];
  const characters: ICharacter[] = [];
  const commanderData = CommanderData;
  const allGoldArraies: string[][] = [];
  for (let i in userData) {
    const newCharacter = makeCharacter(userData[i], commanderData);
    const goldArray = calculateGold(newCharacter.level, CommanderData);
    if (+i < 6) {
      characterOrder.push(newCharacter.characterName);
      allGoldArraies.push(goldArray);
    }

    characters.push(newCharacter);
  }

  console.log({
    characterOrder,
    contentsOrder: makeContentOrder(allGoldArraies),
    characters,
  });
};
export default makeDataResult;
