import { ICommander, IDifficulty } from "../atoms/commander";
import { ICharacter, IContent, IGate } from "../atoms/data";
import { IFetchedCharacter } from "../components/ModalAddAccount";

export type IAccountData = {
  characterOrder: string[];
  contentsOrder: string[];
  checks: {
    contentName: string;
    characterName: string;
  }[];
};
function makeCharacters(data: IFetchedCharacter[]): ICharacter[] {
  const characters: ICharacter[] = [];
  for (let i in data) {
    const { ServerName, ItemMaxLevel, CharacterName, CharacterClassName } =
      data[i];
    characters.push({
      ServerName,
      CharacterName,
      ItemMaxLevel: parseInt(ItemMaxLevel.replace(",", "")),
      CharacterClassName,
      isGoldCharacter: +i < 6 ? true : false,
    });
  }
  return characters;
}
function makeCharacterOrder(
  characters: ICharacter[],
  contents: IContent[],
  contentsOrder: string[]
): string[] {
  const characterOrder: string[] = [];
  for (let i in characters) {
    const { CharacterName } = characters[i];
    const ownedContent = contents.filter(
      ({ owner }) => CharacterName === owner
    );

    const hasVisibleContent = (content: IContent[]) => {
      for (let i = 0; i < content.length; i++) {
        const item = content[i];
        if (item.isVisble === true) {
          return true;
        }
      }
      return false;
    };
    if (hasVisibleContent(ownedContent) && +i < 6) {
      characterOrder.push(CharacterName);
    }
  }
  return characterOrder;
}
function makeGoldCotents(
  contents: IContent[],
  commanderData: ICommander[],
  level: number
) {
  function findDifficulty(
    name: string,
    difficulty: string,
    gateNumber: number
  ) {
    const commander = commanderData.find((elem) => elem.name === name);
    if (!commander) return undefined;
    const findDifficulty = commander.data.find(
      (elem) => elem.difficulty === difficulty
    );
    if (!findDifficulty) return undefined;
    return findDifficulty.gates[gateNumber];
  }
  const goldContents = contents.map(({ contentName, gateSetting }) => {
    let goldIncome = 0;
    for (let gateNumber in gateSetting) {
      const gate = gateSetting[gateNumber];
      const commander = findDifficulty(
        contentName,
        gate.difficulty,
        +gateNumber
      );
      if (!gate.isVisible || !commander) continue;
      if (commander.level > level) continue;
      goldIncome += commander.gold;
    }
    return { name: contentName, goldIncome };
  });
  return goldContents;
}
function makeGateSetting(ItemMaxLevel: number, data: IDifficulty[]): IGate[] {
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
function makeContents(characters: ICharacter[], commanderData: ICommander[]) {
  const allContents: IContent[] = [];
  const contentsOrder: string[] = [];
  for (let i in characters) {
    const { CharacterName, ItemMaxLevel: level } = characters[i];
    const contents: IContent[] = commanderData.map(({ data, name }) => {
      return {
        owner: CharacterName,
        contentName: name,
        isVisble: false,
        isGoldContents: false,
        gateSetting: makeGateSetting(level, data),
      };
    });
    const goldContents = makeGoldCotents(contents, commanderData, level)
      .sort((a, b) => b.goldIncome - a.goldIncome)
      .slice(0, 3);

    for (let j in goldContents) {
      const { goldIncome, name } = goldContents[j];
      if (goldIncome <= 0) continue;
      const index = contents.findIndex(
        ({ contentName }) => contentName === name
      );
      contents[index].isVisble = true;
      contents[index].isGoldContents = true;
      if (!contentsOrder.includes(name) && +i < 6) {
        contentsOrder.push(name);
      }
    }
    allContents.push(...contents);
  }
  return { allContents, contentsOrder };
}

export interface accountData {
  characters: ICharacter[];
  characterOrder: string[];
  contents: IContent[];
  contentsOrder: string[];
}
export const makeDataResult = (
  data: IFetchedCharacter[],
  commanderData: ICommander[]
): accountData => {
  const characters = makeCharacters(data);
  const { allContents: contents, contentsOrder } = makeContents(
    characters,
    commanderData
  );

  const result = {
    characters,
    characterOrder: makeCharacterOrder(characters, contents, contentsOrder),
    contents,
    contentsOrder,
  };
  return result;
};
