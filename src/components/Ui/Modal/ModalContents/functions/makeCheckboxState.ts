import { IContentName } from "../../../../../atoms/atoms";
import makeConfigObject from "./makeConfigObject";
import commander from "./commander.json";
import { IData } from "./makeActivatedAndDifficulty";
import { IFetchedCharacter } from "../AddAccount";
const makeCheckboxState = (Account: IFetchedCharacter[]): IContentName => {
  const result: IContentName = {};
  const commanderData: IData = commander;

  for (let index in Account) {
    const { ItemMaxLevel: level } = Account[index];
    for (let CommanderName in commanderData) {
      result[`${CommanderName}`] = makeConfigObject(
        +level,
        CommanderName,
        "Default"
      );
    }
  }
  return result;
};
export default makeCheckboxState;
