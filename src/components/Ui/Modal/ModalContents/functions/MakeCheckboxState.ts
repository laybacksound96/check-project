import {
  ICharacterState,
  ICheckBoxconfig,
  IContents,
} from "../../../../../atoms";

import makeConfigObject from "./makeConfigObject";

const MakeCheckboxState = (
  Account: ICharacterState,
  Column: IContents
): ICheckBoxconfig => {
  const result: ICheckBoxconfig = {};

  if (!Account || !Account.length) return result;
  for (let CharacterName in Account) {
    const { ItemMaxLevel: level } = Account[CharacterName];
    result[`${CharacterName}`] = {};
    for (let content in Column) {
      result[`${CharacterName}`] = makeConfigObject(
        level,
        content,
        Column[content].type
      );
    }
  }
  return result;
};
export default MakeCheckboxState;
