import { IFetchedCharacter } from "../components/Ui/Modal/ModalContents/AddAccount";
import { ICommanderData, IDifficulty } from "../json/commanderTypes";

export type IAccountData = {
  characterOrder: string[];
  contentsOrder: string[];
  checks: {
    contentName: string;
    characterName: string;
  }[];
};
export type ICharactersData = {
  CharacterName: string;
  ItemMaxLevel: number;
  ServerName: string;
  CharacterClassName: string;
};

export interface IGate {
  isVisible: boolean;
  difficulty: string;
}
export type IContentsData = {
  owner: string;
  contentName: string;
  gateSetting: IGate[];
  isVisble: boolean;
  isGoldContents: boolean;
};

export const makeDataResult = (
  data: IFetchedCharacter[],
  commanderData: ICommanderData[]
) => {
  function makeCharacters(data: IFetchedCharacter[]): ICharactersData[] {
    const characters: ICharactersData[] = [];
    for (let i in data) {
      const { ServerName, ItemMaxLevel, CharacterName, CharacterClassName } =
        data[i];
      characters.push({
        ServerName,
        CharacterName,
        ItemMaxLevel: parseInt(ItemMaxLevel.replace(",", "")),
        CharacterClassName,
      });
    }
    return characters;
  }
  function makeCharacterOrder(characters: ICharactersData[]): string[] {
    const characterOrder: string[] = [];
    for (let i in characters) {
      if (+i < 6) characterOrder.push(data[i].CharacterName);
    }
    return characterOrder;
  }

  function makeContents(
    characters: ICharactersData[],
    commanderData: ICommanderData[]
  ): IContentsData[] {
    const allContents: IContentsData[] = [];

    function makeGoldCotents(
      contents: IContentsData[],
      commanderData: ICommanderData[]
    ) {
      function readGold(name: string, difficulty: string, gateNumber: number) {
        const commander = commanderData.find((elem) => elem.name === name);
        if (!commander) return 0;
        const findDifficulty = commander.data.find(
          (elem) => elem.difficulty === difficulty
        );
        if (!findDifficulty) return 0;
        return findDifficulty.gates[gateNumber].gold;
      }
      const goldContents = contents.map(({ contentName, gateSetting }) => {
        let goldIncome = 0;
        for (let gateNumber in gateSetting) {
          const gate = gateSetting[gateNumber];
          if (!gate.isVisible) continue;
          goldIncome += readGold(contentName, gate.difficulty, +gateNumber);
        }
        return { name: contentName, goldIncome };
      });
      return goldContents;
    }
    for (let i in characters) {
      const { CharacterName, ItemMaxLevel } = characters[i];
      const contents: IContentsData[] = commanderData.map(({ data, name }) => {
        function makeGateSetting(
          ItemMaxLevel: number,
          data: IDifficulty[]
        ): IGate[] {
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
        const content = {
          owner: CharacterName,
          contentName: name,
          isVisble: false, // 골드컨텐츠인지 확인필요
          isGoldContents: false, // 골드컨텐츠인지 확인필요
          gateSetting: makeGateSetting(ItemMaxLevel, data),
        };
        return content;
      });
      const goldContents = makeGoldCotents(contents, commanderData)
        .sort((a, b) => b.goldIncome - a.goldIncome)
        .slice(0, 3);
      goldContents.forEach(({ name }) => {
        const index = contents.findIndex(
          ({ contentName }) => contentName === name
        );
        contents[index].isVisble = true;
        contents[index].isGoldContents = true;
      });
      allContents.push(...contents);
    }
    return allContents;
  }

  const characters = makeCharacters(data);
  const result = {
    characters,
    characterOrder: makeCharacterOrder(characters),
    contents: makeContents(characters, commanderData),
  };
  return result;
};
