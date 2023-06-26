import { ICharacterSetting } from "../../../../../atoms/userSetting";
import { IFetchedCharacter } from "../AddAccount";
import SortByLevel from "./SortByLevel";
import makeCharsContentSetting from "./makeCharsContentSetting";
import makeGoldArray from "./makeGoldArray";
import commander from "./commander.json";
import makeGoldContents from "./makeGoldContents";
import { IData } from "./commanderTypes";
const makeCharacterSetting = (
  Account: IFetchedCharacter[]
): ICharacterSetting => {
  const result: ICharacterSetting = {};
  const SortedAccount = SortByLevel(Account);
  const commanderData: IData = commander;
  if (!Account || !Account.length) return result;
  for (let index in SortedAccount) {
    const { CharacterClassName, ServerName, CharacterName, ItemMaxLevel } =
      SortedAccount[index];
    const level = parseInt(ItemMaxLevel.replace(",", ""));
    const GoldArray = makeGoldArray(level, commanderData);
    const GoldContents = makeGoldContents(GoldArray);
    result[CharacterName] = {
      ServerName,
      CharacterClassName,
      ItemMaxLevel: level,
      IsGoldCharacter: +index < 6 ? true : false,
      isVisible: +index < 6 ? true : false,
      Contents: makeCharsContentSetting(level, commanderData, GoldContents),
      GoldContents,
      TotalGold: 0,
    };
  }
  return result;
};

export default makeCharacterSetting;
