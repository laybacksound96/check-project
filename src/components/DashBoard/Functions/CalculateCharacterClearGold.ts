import { IContentState } from "../../../atoms/Settings/ContentSetting";
import { IGatesContent } from "../../../atoms/Settings/Gates";
import { IData } from "../../../json/commanderTypes";
import commander from "../../../json/commander.json";
const CalculateCharacterClearGold = (
  contentState: IContentState,
  gatesContent: IGatesContent
) => {
  const commanderData: IData = commander;
  let result = 0;
  for (let contentName in contentState) {
    const { isVisible, isCleared, isActivated } = contentState[contentName];
    if (!isActivated || !isVisible || !isCleared) continue;
    const gate = gatesContent[contentName];
    for (let index in gate) {
      const { Difficulty, isActivated, isVisible } = gate[index];
      const gold = commanderData[contentName][index][Difficulty]?.gold;
      if (!isVisible || !isActivated || !gold) continue;
      result += gold;
    }
  }
  return result;
};

export default CalculateCharacterClearGold;
