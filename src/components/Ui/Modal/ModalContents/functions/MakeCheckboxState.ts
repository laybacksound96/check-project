import { ICheckCharacters, IContents } from "../../../../../atoms";
import { IFetchedCharacter } from "../AddAccount";

const MakeCheckboxState = (Account: IFetchedCharacter[], Column: IContents) => {
  const result: ICheckCharacters = {};
  if (!Account || !Account.length) return result;
  for (let index in Account) {
    const { CharacterName } = Account[index];
    result[CharacterName] = {};
    for (let content in Column) {
      result[CharacterName][content] = false;
    }
  }
  return result;
};
export default MakeCheckboxState;
