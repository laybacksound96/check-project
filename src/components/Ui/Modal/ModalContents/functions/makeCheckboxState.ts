import { ICharacterState, ICheckBoxconfig } from "../../../../../atoms/atoms";

import makeConfigObject from "./makeConfigObject";
import commander from "./commander.json";
import { IData } from "./makeActivatedAndDifficulty";
const makeCheckboxState = (Account: ICharacterState): ICheckBoxconfig => {
  const result: ICheckBoxconfig = {};
  const commanderData: IData = commander;

  for (let CharacterName in Account) {
    const { ItemMaxLevel: level } = Account[CharacterName];
    result[`${CharacterName}`] = {};
    for (let CommanderName in commanderData) {
      result[`${CharacterName}`][CommanderName] = makeConfigObject(
        level,
        CommanderName,
        "Default"
      );
    }
  }
  return result;
};
export default makeCheckboxState;
