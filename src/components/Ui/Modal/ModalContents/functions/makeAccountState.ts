import { ICharacterState } from "../../../../../atoms/atoms";
import { IFetchedCharacter } from "../AddAccount";
import SortByLevel from "./SortByLevel";
import makeCheckboxState from "./makeCheckboxState";

const makeAccountState = (Account: IFetchedCharacter[]): ICharacterState => {
  const result: ICharacterState = {};
  const SortedAccount = SortByLevel(Account);
  const contents = makeCheckboxState(Account);
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
      isVisible: +index < 6 ? true : false,
      Contents: contents,
    };
  }
  return result;
};

export default makeAccountState;
