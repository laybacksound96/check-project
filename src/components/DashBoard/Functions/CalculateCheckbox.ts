import { ICheckBoxconfig, IContents, IContentsFrequency } from "../../../atoms";

import CalculateGateDifficulty from "./CalculateGateDifficulty";
import getRandomPastelColor from "./getRandomPastelColor";

export const CalculateCheckbox = (
  Accounts: ICheckBoxconfig,
  Contents: IContents,
  Prev: IContentsFrequency
) => {
  const resultObj: IContentsFrequency = {};
  for (const CharacterName in Accounts) {
    for (const ContentName in Contents) {
      const state = Accounts[CharacterName][ContentName];
      if (state.isVisible === false) continue;
      if (Contents[ContentName].isVisible === false) continue;
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
            Color: getRandomPastelColor(),
          };
        }
        if (state.isCleared === false) resultObj[Key].Frequency++;
        resultObj[Key].ContentsOwner.push(CharacterName);
      }
      if (Contents[ContentName].type === "Custom") {
        if (resultObj[ContentName] === undefined) {
          resultObj[ContentName] = {
            Frequency: 0,
            GateState: [],
            ContentsName: ContentName,
            ContentsOwner: [],
            Color: getRandomPastelColor(),
          };
        }
        if (state.isCleared === false) resultObj[ContentName].Frequency++;
        resultObj[ContentName].ContentsOwner.push(CharacterName);
      }
    }
  }

  return resultObj;
};

export default CalculateCheckbox;
