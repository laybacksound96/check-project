import makeCharsContentState from "./makeCharsContentState";
import {
  ICharsContentSetting,
  IGoldContents,
} from "../../../../../atoms/userSetting";
import { IData } from "./calculateDifficultyAndActivate";
function isGoldContents(
  GoldContents: IGoldContents[],
  CommanderName: string
): boolean {
  if (GoldContents.find((elem) => elem.CommanderName === CommanderName)) {
    return true;
  }
  return false;
}
const makeCharsContentSetting = (
  level: number,
  commanderData: IData,
  GoldContents: IGoldContents[]
): ICharsContentSetting => {
  const result: ICharsContentSetting = {};
  for (let CommanderName in commanderData) {
    result[`${CommanderName}`] = makeCharsContentState(
      level,
      CommanderName,
      "Default",
      isGoldContents(GoldContents, CommanderName)
    );
  }
  return result;
};
export default makeCharsContentSetting;
