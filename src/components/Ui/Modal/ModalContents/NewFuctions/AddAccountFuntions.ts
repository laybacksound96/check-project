import { AccountInfo, Info } from "../../../../../atoms/Info/CharacterInfo";
import {
  AccountSetting,
  Setting,
} from "../../../../../atoms/Settings/CharacterSetting";
import {
  IContentSetting,
  IContentState,
} from "../../../../../atoms/Settings/ContentSetting";
import { IFetchedCharacter } from "../AddAccount";
import commander from "../../../../../json/commander.json";
import { IData, IGates } from "../../../../../json/commanderTypes";
import IsValidLevel from "../functions/Validation/IsValidLevel";
import {
  IGoldIncomeCharacter,
  IGoldIncomeContent,
} from "../../../../../atoms/Settings/GoldIncome";
import {
  IGatesCharacter,
  IGatesContent,
  IGatesSetting,
} from "../../../../../atoms/Settings/Gates";

interface INewCotentsResult {
  contentSetting: IContentState;
  goldIncome: IGoldIncomeContent;
  gates: IGatesContent;
}

const commanderData: IData = commander;
function makeNewGates(level: number, gates: IGates[]): IGatesSetting[] {
  function isHard(
    hardLevel: number | undefined,
    level: number
  ): "normal" | "hard" {
    if (!hardLevel) return "normal";
    if (level < hardLevel) return "normal";
    return "hard";
  }
  const result: IGatesSetting[] = [];
  for (let index in gates) {
    const hardLevel = gates[index].hard?.level;
    const normalLevel = gates[index].normal.level;
    const gate: IGatesSetting = {
      Gate_No: +index + 1,
      Difficulty: isHard(hardLevel, level),
      isActivated: level > normalLevel,
      isVisible: level > normalLevel,
    };
    result.push(gate);
  }
  return result;
}
function calculateIncome(Name: string, Gate: IGatesSetting[]): number {
  let resultGold = 0;
  for (let index in Gate) {
    const { isActivated, isVisible, Difficulty } = Gate[index];
    const gold = commanderData[Name][index][Difficulty]?.gold;
    if (!(isActivated && isVisible && gold !== undefined)) continue;
    resultGold += gold;
  }
  return resultGold;
}
function makeCotentState(level: number): INewCotentsResult {
  function makeGoldArray(income: IGoldIncomeContent) {
    const keys = Object.keys(income);
    const sortedKeys = keys.sort((a, b) => income[b] - income[a]);
    const result = sortedKeys.slice(0, 3);
    return result;
  }
  const result: INewCotentsResult = {
    contentSetting: {},
    goldIncome: {},
    gates: {},
  };
  for (let contentName in commanderData) {
    const NewGate = makeNewGates(level, commanderData[contentName]);
    const Income = calculateIncome(contentName, NewGate);
    result.contentSetting[`${contentName}`] = {
      isActivated: IsValidLevel(contentName, level),
      isCleared: false,
      isGoldContents: false,
      isVisible: false,
    };
    result.goldIncome[`${contentName}`] = Income;
    result.gates[`${contentName}`] = NewGate;
  }
  const GoldArray = makeGoldArray(result.goldIncome);
  for (let Name in GoldArray) {
    result.contentSetting[`${GoldArray[Name]}`].isGoldContents = true;
    result.contentSetting[`${GoldArray[Name]}`].isVisible = true;
  }
  return result;
}
interface INewAccount {
  accountInfo: AccountInfo;
  accountSetting: AccountSetting;
  contentSetting: IContentSetting;
  GoldIncome: IGoldIncomeCharacter;
  gates: IGatesCharacter;
}
export function makeNewAccount(
  fetchedCharacters: IFetchedCharacter[]
): INewAccount {
  const NewAccount: INewAccount = {
    accountInfo: {},
    accountSetting: {},
    contentSetting: {},
    GoldIncome: {},
    gates: {},
  };
  for (let index in fetchedCharacters) {
    const {
      CharacterName: Name,
      CharacterClassName: ClassName,
      ItemMaxLevel,
      ServerName,
    } = fetchedCharacters[index];
    const Level = parseInt(ItemMaxLevel.replace(",", ""));
    const info: Info = { ClassName, Level, ServerName };
    const setting: Setting = {
      IsGoldCharacter: +index < 6 ? true : false,
      isVisible: +index < 6 ? true : false,
      TotalGoldIncome: 0,
    };
    NewAccount.accountInfo[`${Name}`] = info;
    NewAccount.accountSetting[`${Name}`] = setting;

    const { contentSetting, gates, goldIncome } = makeCotentState(Level);
    NewAccount.contentSetting[`${Name}`] = contentSetting;
    NewAccount.gates[`${Name}`] = gates;
    NewAccount.GoldIncome[`${Name}`] = goldIncome;
  }
  return NewAccount;
}

export function makeContentSetting() {}
