import makeCharsContentState from "./makeCharsContentState";
import commander from "./commander.json";
import { IData } from "./makeActivatedAndDifficulty";
import { IFetchedCharacter } from "../AddAccount";
import { ICharsContentSetting } from "../../../../../atoms/userSetting";
const makeCharsContentSetting = (
  Account: IFetchedCharacter[]
): ICharsContentSetting => {
  const result: ICharsContentSetting = {};
  const commanderData: IData = commander;

  for (let index in Account) {
    const { ItemMaxLevel: level } = Account[index];
    for (let CommanderName in commanderData) {
      result[`${CommanderName}`] = makeCharsContentState(
        +level,
        CommanderName,
        "Default"
      );
    }
  }
  return result;
};
export default makeCharsContentSetting;
