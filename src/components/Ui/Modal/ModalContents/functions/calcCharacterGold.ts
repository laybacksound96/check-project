import { IContentState } from "../../../../../atoms/Settings/ContentSetting";
import { IGatesContent } from "../../../../../atoms/Settings/Gates";
import { IData } from "../../../../../json/commanderTypes";
import commander from "../../../../../json/commander.json";
function calcCharacterGold(
  GatesContent: IGatesContent,
  ContentState: IContentState
): number {
  const commanderData: IData = commander;
  let gold = 0;
  for (let contentName in GatesContent) {
    const { isGoldContents, isActivated, isVisible } =
      ContentState[contentName];
    if (!isGoldContents || !isActivated || !isVisible) continue;
    for (let index in GatesContent[contentName]) {
      const { Difficulty, isVisible, isActivated } =
        GatesContent[contentName][index];
      const CommanderGold = commanderData[contentName][index][Difficulty]?.gold;
      if (!CommanderGold || !isVisible || !isActivated) continue;
      gold += CommanderGold;
    }
  }

  return gold;
}
export default calcCharacterGold;
