import { ICheckCharacters, IContents } from "../../../../../atoms";
import { IFetchedCharacter } from "../AddAccount";

const MakeCheckboxState = (Account: IFetchedCharacter[], Column: IContents) => {
  const result: ICheckCharacters = {};
  if (!Account || !Account.length) return result;
  for (let index in Account) {
    const { CharacterName } = Account[index];
    result[CharacterName] = {};
    for (let content in Column) {
      const initialState = { isCleared: false, isVisible: true };
      result[CharacterName][content] = initialState;
    }
  }
  return result;
};
export default MakeCheckboxState;