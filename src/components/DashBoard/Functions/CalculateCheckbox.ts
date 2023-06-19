import {
  IAccountState,
  ICheckBoxconfig,
  IContents,
  IContentsFrequency,
} from "../../../atoms/atoms";

import CalculateGateDifficulty from "./CalculateGateDifficulty";
import getRandomPastelColor from "./getRandomPastelColor";

export const CalculateCheckbox = (
  Accounts: ICheckBoxconfig,
  Contents: IContents,
  accountState: IAccountState,
  Prev: IContentsFrequency
): IContentsFrequency => {
  const resultObj: IContentsFrequency = {};

  for (const AccountName in accountState) {
    for (const CharacterName in accountState[AccountName]) {
      const { isVisible: CharacterVisible } =
        accountState[AccountName][CharacterName];
      if (!CharacterVisible) continue;
      for (const ContentName in Contents) {
        const { type, isVisible: contentsVisible } = Contents[ContentName];
        const { isActivated, isVisible, Gates, isCleared } =
          Accounts[CharacterName][ContentName];
        if (!contentsVisible || !isVisible || !isActivated) continue;
        if (type === "Default") {
          const gates = CalculateGateDifficulty(Gates);
          const Key = `${ContentName}_${gates.join("_")}`;
          if (resultObj[Key] === undefined) {
            resultObj[Key] = {
              Frequency: 0,
              GateState: gates,
              ContentsName: ContentName,
              ContentsOwner: [],
              Color: Prev.hasOwnProperty(Key)
                ? Prev[Key].Color
                : getRandomPastelColor(ContentName),
            };
          }
          if (!isCleared) {
            resultObj[Key].Frequency++;
            resultObj[Key].ContentsOwner.push(CharacterName);
          }
        }
        if (type === "Custom") {
          if (resultObj[ContentName] === undefined) {
            resultObj[ContentName] = {
              Frequency: 0,
              GateState: [],
              ContentsName: ContentName,
              ContentsOwner: [],
              Color: getRandomPastelColor(ContentName),
            };
          }
          if (!isCleared) resultObj[ContentName].Frequency++;
          resultObj[ContentName].ContentsOwner.push(CharacterName);
        }
      }
    }
  }
  return resultObj;
};

export default CalculateCheckbox;
