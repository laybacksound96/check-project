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
import IsValidLevel from "./Validation/IsValidLevel";

import {
  IGatesCharacter,
  IGatesContent,
  IGatesSetting,
} from "../../../../../atoms/Settings/Gates";

interface INewCotentsResult {
  contentSetting: IContentState;
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

function makeCotentState(level: number): INewCotentsResult {
  const result: INewCotentsResult = {
    contentSetting: {},
    gates: {},
  };
  for (let contentName in commanderData) {
    const NewGate = makeNewGates(level, commanderData[contentName]);
    result.contentSetting[`${contentName}`] = {
      isActivated: IsValidLevel(contentName, level),
      isCleared: false,
      isGoldContents: false,
      isVisible: false,
    };
    result.gates[`${contentName}`] = NewGate;
  }

  return result;
}
interface INewAccount {
  accountInfo: AccountInfo;
  accountSetting: AccountSetting;
  contentSetting: IContentSetting;
  gates: IGatesCharacter;
}
export function makeNewAccount(
  fetchedCharacters: IFetchedCharacter[]
): INewAccount {
  const NewAccount: INewAccount = {
    accountInfo: {},
    accountSetting: {},
    contentSetting: {},
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
    const { contentSetting, gates } = makeCotentState(Level);
    NewAccount.contentSetting[`${Name}`] = contentSetting;
    NewAccount.gates[`${Name}`] = gates;
    const info: Info = { ClassName, Level, ServerName };
    const setting: Setting = {
      IsGoldCharacter: +index < 6 ? true : false,
      isVisible: +index < 6 ? true : false,
    };
    NewAccount.accountInfo[`${Name}`] = info;
    NewAccount.accountSetting[`${Name}`] = setting;
  }
  return NewAccount;
}
