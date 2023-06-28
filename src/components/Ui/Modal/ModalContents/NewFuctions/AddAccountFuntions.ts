import { AccountInfo, Info } from "../../../../../atoms/Info/CharacterInfo";
import {
  AccountSetting,
  Setting,
} from "../../../../../atoms/Settings/CharacterSetting";
import {
  ContentStateSetting,
  IContentSetting,
  IContentState,
} from "../../../../../atoms/Settings/ContentSetting";
import { IFetchedCharacter } from "../AddAccount";
import commander from "../../../../../json/commander.json";
import { IData } from "../../../../../json/commanderTypes";
import IsValidLevel from "../functions/IsValidLevel";
export interface NewAccount {
  accountInfo: AccountInfo;
  accountSetting: AccountSetting;
  contentSetting: IContentSetting;
}
DefaultObject.isActivated = IsValidLevel(content, level);
DefaultObject.Gates = makeGates(content, level);
DefaultObject.isVisible = isGoldContents;
DefaultObject.isGoldContents = isGoldContents;

function makeCotentState(level: number): IContentState {
  const result: IContentState = {};
  const commanderData: IData = commander;
  for (let contentName in commanderData) {
    const setting: ContentStateSetting = {
      isActivated: IsValidLevel(contentName, level),
      isCleared: false,
      isGoldContents: false,
      isVisible: false,
    };
    result[`${contentName}`] = setting;
  }
  return result;
}

export function makeNewAccount(
  fetchedCharacters: IFetchedCharacter[]
): NewAccount {
  const result: NewAccount = {
    accountInfo: {},
    accountSetting: {},
    contentSetting: {},
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
    result.accountInfo[`${Name}`] = info;
    result.accountSetting[`${Name}`] = setting;
    result.contentSetting[`${Name}`] = makeCotentState(Level);
  }
  return result;
}

export function makeContentSetting() {}
