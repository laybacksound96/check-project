import {
  ICharacterState,
  ICheckBoxconfig,
  IContents,
} from "../../../../../atoms/atoms";

import makeConfigObject from "./makeConfigObject";

const makeCheckboxState = (
  Account: ICharacterState,
  Column: IContents
): ICheckBoxconfig => {
  const result: ICheckBoxconfig = {};

  for (let CharacterName in Account) {
    const { ItemMaxLevel: level } = Account[CharacterName];
    result[`${CharacterName}`] = {};
    for (let content in Column) {
      result[`${CharacterName}`][content] = makeConfigObject(
        level,
        content,
        Column[content].type
      );
    }
  }
  return result;
};
export default makeCheckboxState;
