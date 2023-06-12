import { ICharacterState } from "../../../../../atoms/atoms";
import { IFetchedCharacter } from "../AddAccount";
import SortByLevel from "./SortByLevel";
import calculateGoldContents from "./calculateGoldContents";

const makeAccountState = (Account: IFetchedCharacter[]) => {
  const result: ICharacterState = {};
  const SortedAccount = SortByLevel(Account);
  if (!Account || !Account.length) return result;
  for (let index in SortedAccount) {
    const { CharacterClassName, ServerName, CharacterName, ItemMaxLevel } =
      Account[index];
    const level = parseInt(ItemMaxLevel.replace(",", ""));
    result[CharacterName] = {
      ServerName: ServerName,
      CharacterClassName: CharacterClassName,
      ItemMaxLevel: level,
      IsGoldCharacter: +index < 6 ? true : false,
      GoldContents: calculateGoldContents(level),
      isVisible: +index < 6 ? true : false,
    };
  }
  return result;
};

export default makeAccountState;
