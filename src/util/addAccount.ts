import { ICommander, IDifficulty } from "../atoms/commander";
import { ICharacter, IContent, IGate } from "../atoms/data";
import { IFetchedData } from "../atoms/fetchData";
import { IFetchedCharacter } from "../components/ModalAddAccount";

export type IAccountData = {
  characterOrder: string[];
  contentsOrder: string[];
  checks: {
    contentName: string;
    characterName: string;
  }[];
};

export const makeDataResult = (
  data: IFetchedCharacter[],
  commanderData: ICommander[]
) => {
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
    console.log(characters);
    return characters;
  }
  function makeCharacterOrder(characters: ICharacter[]): string[] {
    const characterOrder: string[] = [];
    for (let i in characters) {
      if (+i < 6) characterOrder.push(data[i].CharacterName);
    }
    return characterOrder;
  }
  function makeContents(characters: ICharacter[], commanderData: ICommander[]) {
    const allContents: IContent[] = [];
    const contentsOrder: string[] = [];
    function makeGoldCotents(
      contents: IContent[],
      commanderData: ICommander[]
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
      const contents: IContent[] = commanderData.map(({ data, name }) => {
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
        if (!contentsOrder.includes(name) && +i < 6) {
          contentsOrder.push(name);
        }
      });
      allContents.push(...contents);
    }
    return { allContents, contentsOrder };
  }
  const characters = makeCharacters(data);
  const { allContents: contents, contentsOrder } = makeContents(
    characters,
    commanderData
  );
  const result = {
    characters,
    characterOrder: makeCharacterOrder(characters),
    contents,
    contentsOrder,
  };
  return result;
};
