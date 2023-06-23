import makeCharsContentState from "./makeCharsContentState";
import commander from "./commander.json";
import { IData } from "./calculateDifficultyAndActivate";
import { IFetchedCharacter } from "../AddAccount";
import { ICharsContentSetting } from "../../../../../atoms/userSetting";

const makeCharsContentSetting = (
  Account: IFetchedCharacter[]
): ICharsContentSetting => {
  const result: ICharsContentSetting = {};
  const commanderData: IData = commander;
  for (let index in Account) {
    const { ItemMaxLevel } = Account[index];
    const level = parseInt(ItemMaxLevel.replace(",", ""));

    for (let CommanderName in commanderData) {
      result[`${CommanderName}`] = makeCharsContentState(
        level,
        CommanderName,
        "Default"
      );
    }
  }
  return result;
};
export default makeCharsContentSetting;
