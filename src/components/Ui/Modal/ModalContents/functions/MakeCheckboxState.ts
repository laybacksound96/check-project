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
  console.log("------MakeCheckboxState--------");
  console.log(Account);
  console.log(Column);
  console.log("------MakeCheckboxState--------");
  const result: ICheckBoxconfig = {};

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
