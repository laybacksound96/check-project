import { ICharacterState } from "../../../../../atoms";
import { IFetchedCharacter } from "../AddAccount";

const MakeAccountState = (Account: IFetchedCharacter[]) => {
  const result: ICharacterState = {};
  if (!Account || !Account.length) return result;
  for (let index in Account) {
    const { CharacterClassName, ServerName, CharacterName, ItemMaxLevel } =
      Account[index];
    const level = parseInt(ItemMaxLevel.replace(",", ""));
    result[CharacterName] = {
      ServerName: ServerName,
      CharacterClassName: CharacterClassName,
      ItemMaxLevel: level,
    };
  }
  return result;
};

export default MakeAccountState;
