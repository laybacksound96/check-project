import { ICheckBoxconfig, IContents } from "../../../atoms";
import { IContentsFrequency } from "../HeaderBox/Contents";
import CalculateGateDifficulty from "./CalculateGateDifficulty";

export const CalculateCheckbox = (
  Accounts: ICheckBoxconfig,
  Contents: IContents
) => {
  const resultObj: IContentsFrequency = {};
  for (const CharacterName in Accounts) {
    for (const ContentName in Contents) {
      const state = Accounts[CharacterName][ContentName];
      if (state.isVisible === false) continue;
      if (Contents[ContentName].type === "Default") {
        if (state.Gates === undefined) continue;
        const gates = CalculateGateDifficulty(state.Gates);
        const Key = `${ContentName}_${gates.join("_")}`;
        if (resultObj[Key] === undefined) {
          resultObj[Key] = {
            Frequency: 0,
            GateState: gates,
            ContentsName: ContentName,
            ContentsOwner: [],
          };
        }
        if (state.isCleared === false) resultObj[Key].Frequency++;
        resultObj[Key].ContentsOwner.push(CharacterName);
      }
      if (Contents[ContentName].type === "Custom") {
        if (resultObj[ContentName] === undefined) {
          resultObj[ContentName].Frequency = 0;
          resultObj[ContentName].GateState = [];
          resultObj[ContentName].ContentsName = ContentName;
        }
        if (state.isCleared === false) resultObj[ContentName].Frequency++;
      }
    }
  }
  return resultObj;
};

export default CalculateCheckbox;
