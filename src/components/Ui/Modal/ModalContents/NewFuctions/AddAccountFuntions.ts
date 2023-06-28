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
export interface NewAccount {
  accountInfo: AccountInfo;
  accountSetting: AccountSetting;
  contentSetting: IContentSetting;
}

function makeCotentState(Level: number): IContentState {
  const result: IContentState = {};
  const commanderData: IData = commander;
  for (let commanderName in commanderData) {
    const setting: ContentStateSetting = {
      isActivated: false,
      isCleared: false,
      isGoldContents: false,
      isVisible: false,
    };
    result[`${commanderName}`] = setting;
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
