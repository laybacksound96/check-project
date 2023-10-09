import { ICommander, IGates } from "../atoms/commander";
import { IFetchedCharacter } from "../components/ModalAddAccount";
interface IContent {
  owner: string;
  contentName: string;
  gateSetting: IGate[];
  isVisble: boolean;
  isGoldContents: boolean;
}
interface IGate {
  isVisible: boolean;
  difficulty: string;
}
type ICharacter = {
  CharacterName: string;
  ItemMaxLevel: number;
  ServerName: string;
  CharacterClassName: string;
  isGoldCharacter: boolean;
};
function sortCommander(frequency: string[]) {
  const sortOrder = [
    "카멘",
    "상아탑",
    "일리아칸",
    "아브렐슈드",
    "카양겔",
    "쿠크세이튼",
    "비아키스",
    "발탄",
    "아르고스",
  ];

  return frequency.sort((a, b) => {
    const indexA = sortOrder.indexOf(a);
    const indexB = sortOrder.indexOf(b);

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });
}
function compareNumber(a: number, b: number) {
  return b - a;
}
interface IGoldContents {
  name: string;
  goldIncome: number;
}
export function makeGoldCotents(
  level: number,
  commanderData: ICommander[]
): IGoldContents[] {
  const calculateGold = (level: number, data: IGates[]) => {
    const goldArray = data.map(({ gates }) => {
      let income = 0;
      gates.forEach(({ gold, level: gateLevel }) => {
        if (level >= gateLevel) {
          income += gold;
        }
      });
      return income;
    });
    return goldArray;
  };
  const goldContents = commanderData.map(({ data, name }) => {
    const golds = calculateGold(level, data).sort(compareNumber);
    return { name, goldIncome: golds[0] };
  });
  return goldContents.sort((a, b) => b.goldIncome - a.goldIncome).slice(0, 3);
}
export const makeCharacter = (data: IFetchedCharacter): ICharacter => {
  const { CharacterName, CharacterClassName, ServerName, ItemMaxLevel } = data;
  const result: ICharacter = {
    CharacterName,
    CharacterClassName,
    ServerName,
    isGoldCharacter: false,
    ItemMaxLevel: parseInt(ItemMaxLevel.replace(",", "")),
  };
  return result;
};
export const makeContent = (
  { ItemMaxLevel, CharacterName }: ICharacter,
  commander: ICommander,
  goldContents: IGoldContents[]
): IContent => {
  const isGoldContents = goldContents.find(
    ({ name }) => name === commander.name
  );
  const result: IContent = {
    owner: CharacterName,
    contentName: commander.name,
    gateSetting: makeGateSetting(ItemMaxLevel, commander.data),
    isVisble: isGoldContents ? true : false,
    isGoldContents: isGoldContents ? true : false,
  };
  return result;
};

export function makeGateSetting(ItemMaxLevel: number, data: IGates[]): IGate[] {
  const isActiveLevel = () => {
    return data[0].gates[0].level <= ItemMaxLevel;
  };
  const initialSetting: IGate[] = data[0].gates.map(() => {
    return { difficulty: "normal", isVisible: false };
  });
  if (!isActiveLevel()) return initialSetting;

  for (let i in data) {
    const currentData = data[i];
    for (let j in initialSetting) {
      if (currentData.gates[j].level <= ItemMaxLevel) {
        initialSetting[j].difficulty = currentData.difficulty;
        initialSetting[j].isVisible = true;
      }
    }
  }

  return initialSetting;
}
export const makeContents = (
  characters: ICharacter[],
  commanderData: ICommander[]
): IContent[] => {
  const contents: IContent[] = [];
  characters.forEach((character) => {
    const goldContents = makeGoldCotents(character.ItemMaxLevel, commanderData);
    const characterContents = commanderData.map((commander) =>
      makeContent(character, commander, goldContents)
    );
    characterContents.forEach((content) => contents.push(content));
  });
  return contents;
};

export const makeContentsOrder = (order: string[], contents: IContent[]) => {
  const result: string[] = [];
  order.forEach((name) => {
    const content = contents.filter(
      ({ owner, isVisble }) => owner === name && isVisble === true
    );
    const contentsNames = content.map(({ contentName }) => contentName);
    contentsNames.forEach((name) => {
      if (!result.includes(name)) {
        result.push(name);
      }
    });
  });
  return sortCommander(result);
};

export interface INewAccountData {
  characters: ICharacter[];
  characterOrder: string[];
  contents: IContent[];
  contentsOrder: string[];
}
export function makeAccount(
  fetchedData: IFetchedCharacter[],
  commanderData: ICommander[]
): INewAccountData {
  const characters = fetchedData
    .map((character) => makeCharacter(character))
    .sort((a, b) => b.ItemMaxLevel - a.ItemMaxLevel);
  const characterOrder = characters
    .map(({ CharacterName }) => CharacterName)
    .slice(0, 6);
  const contents = makeContents(characters, commanderData);
  const contentsOrder = makeContentsOrder(characterOrder, contents);

  return { characters, characterOrder, contents, contentsOrder };
}
