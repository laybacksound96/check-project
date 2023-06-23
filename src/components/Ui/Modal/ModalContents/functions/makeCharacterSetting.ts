import { ICharacterSetting } from "../../../../../atoms/userSetting";
import { IFetchedCharacter } from "../AddAccount";
import SortByLevel from "./SortByLevel";
import makeCheckboxState from "./makeCharsContentSetting";
import makeGoldArray from "./makeGoldArray";
import commander from "./commander.json";
import { IData } from "./calculateDifficultyAndActivate";
import makeGoldContents from "./makeGoldContents";
const makeCharacterSetting = (
  Account: IFetchedCharacter[]
): ICharacterSetting => {
  const result: ICharacterSetting = {};
  const SortedAccount = SortByLevel(Account);
  const Contents = makeCheckboxState(Account);
  const commanderData: IData = commander;
  if (!Account || !Account.length) return result;
  for (let index in SortedAccount) {
    const { CharacterClassName, ServerName, CharacterName, ItemMaxLevel } =
      Account[index];
    const level = parseInt(ItemMaxLevel.replace(",", ""));
    const GoldArray = makeGoldArray(level, commanderData);
    result[CharacterName] = {
      ServerName,
      CharacterClassName,
      ItemMaxLevel: level,
      IsGoldCharacter: +index < 6 ? true : false,
      isVisible: +index < 6 ? true : false,
      Contents,
      GoldContents: makeGoldContents(GoldArray),
    };
  }
  return result;
};

export default makeCharacterSetting;
