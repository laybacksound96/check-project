import { ICheckCharacters, IContents } from "../../../../../atoms";
import { IFetchedCharacter } from "../AddAccount";
import IsValidLevel from "./IsValidLevel";

const MakeCheckboxState = (Account: IFetchedCharacter[], Column: IContents) => {
  const result: ICheckCharacters = {};

  if (!Account || !Account.length) return result;
  for (let index in Account) {
    const { CharacterName } = Account[index];
    const { ItemMaxLevel } = Account[index];
    const level = parseFloat(ItemMaxLevel.replace(",", ""));

    result[CharacterName] = {};
    for (let content in Column) {
      const initialState = {
        isCleared: false,
        isVisible: IsValidLevel(content, level),
      };
      result[CharacterName][content] = initialState;
    }
  }
  return result;
};
export default MakeCheckboxState;
