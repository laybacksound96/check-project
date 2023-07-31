import {
  IAccounts,
  ICharacters,
  IContent,
  IGate,
} from "../../../../../../atoms/data";
import {
  CommanderData,
  ICommanderData,
  ICommanderGates,
} from "../../../../../../json/commanderTypes";
import { IFetchedCharacter } from "../../AddAccount";
function isNormal(hardLevel: number | undefined, level: number): boolean {
  if (!hardLevel) return true;
  if (level < hardLevel) return true;
  return false;
}
const isGoldContents = (
  goldArray: {
    contentName: string;
    gold: number;
  }[],
  contentName: string,
  isCharaVisible: boolean
) => {
  if (!isCharaVisible) return false;
  const index = goldArray.findIndex((cont) => cont.contentName === contentName);
  if (index === -1) return false;
  if (index < 3) return true;
  return false;
};
const makeCharacter = (data: IFetchedCharacter[]): ICharacters[] => {
  const result: ICharacters[] = [];
  for (let i in data) {
    const { CharacterClassName, CharacterName, ItemMaxLevel, ServerName } =
      data[i];
    const character: ICharacters = {
      level: parseInt(ItemMaxLevel.replace(",", "")),
      className: CharacterClassName,
      characterName: CharacterName,
      serverName: ServerName,
      isVisible: +i < 6,
      isGoldCharacter: +i < 6,
    };
    result.push(character);
  }
  return result;
};

const makeAccount = (
  data: IFetchedCharacter[],
  contentsOrder: string[]
): IAccounts => {
  const accountName = data[0].CharacterName;
  const characterOrder = data
    .slice(0, 6)
    .map(({ CharacterName }) => CharacterName);
  const result = {
    accountName,
    characterOrder,
    contentsOrder,
  };
  return result;
};

const makeGate = (gates: ICommanderGates[], level: number): IGate[] => {
  const result: IGate[] = [];
  for (let index in gates) {
    const hardLevel = gates[index].hard?.level;
    const normalLevel = gates[index].normal.level;
    result.push({
      isNormal: isNormal(hardLevel, level),
      isVisible: level >= normalLevel,
    });
  }
  return result;
};
const makeGoldArray = (level: number, Commander: ICommanderData) => {
  const result = [];
  const Difficulty = (isNormal: boolean): "normal" | "hard" => {
    if (isNormal) {
      return "normal";
    } else {
      return "hard";
    }
  };
  for (let contentName in Commander) {
    const gates = makeGate(Commander[contentName], level);
    if (!gates[0].isVisible) continue;
    let gold = 0;
    for (let index in gates) {
      if (!gates[index].isVisible) continue;
      const difficulty = Difficulty(gates[index].isNormal);
      const commanderGold = Commander[contentName][index][difficulty]?.gold;
      if (!commanderGold) continue;
      gold += commanderGold;
    }
    result.push({ contentName, gold });
  }

  return result.sort((a, b) => b.gold - a.gold);
};
const makeContent = (
  Character: ICharacters[]
): { Content: IContent[]; contentOrder: string[] } => {
  const result: IContent[] = [];
  const contentOrder: string[] = [];
  const Commander = CommanderData;
  for (let charaIndex in Character) {
    const {
      level,
      characterName,
      isVisible: isCharaVisible,
    } = Character[charaIndex];
    const goldArray = makeGoldArray(level, CommanderData);
    for (let contentName in Commander) {
      const gates = makeGate(Commander[contentName], level);
      const content: IContent = {
        characterName,
        contentName,
        isCleared: false,
        gates,
        isVisible: isGoldContents(goldArray, contentName, isCharaVisible),
        isGoldContents: isGoldContents(goldArray, contentName, isCharaVisible),
      };
      if (content.isGoldContents && !contentOrder.includes(contentName)) {
        contentOrder.push(contentName);
      }
      result.push(content);
    }
  }

  contentOrder.sort(
    (a, b) => Commander[a][0].normal.level - Commander[b][0].normal.level
  );
  return { Content: result, contentOrder };
};

interface dataResult {
  Accounts: IAccounts;
  Character: ICharacters[];
  Content: IContent[];
}
const makeDataResult = (data: IFetchedCharacter[]): dataResult => {
  const Character = makeCharacter(data);
  const { Content, contentOrder } = makeContent(Character);
  const Accounts = makeAccount(data, contentOrder);
  return {
    Accounts,
    Character,
    Content,
  };
};
export default makeDataResult;
