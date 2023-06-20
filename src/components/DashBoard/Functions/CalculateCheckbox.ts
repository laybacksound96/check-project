import {
  IAccountState,
  ICheckBoxconfig,
  IContentsFrequency,
  IContentsState,
} from "../../../atoms/atoms";

import CalculateGateDifficulty from "./CalculateGateDifficulty";
import getRandomPastelColor from "./getRandomPastelColor";

export const CalculateCheckbox = (
  Accounts: ICheckBoxconfig,
  Contents: IContentsState,
  accountState: IAccountState,
  Prev: IContentsFrequency
): IContentsFrequency => {
  const resultObj: IContentsFrequency = {};

  for (const AccountName in accountState) {
    for (const CharacterName in accountState[AccountName]) {
      const { isVisible: CharacterVisible } =
        accountState[AccountName][CharacterName];
      if (!CharacterVisible) continue;
      for (const ContentName in Contents[AccountName]) {
        const { type, isVisible: contentsVisible } =
          Contents[AccountName][ContentName];
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
              Owner: [],
              ReamainOwner: [],
              Color: Prev.hasOwnProperty(Key)
                ? Prev[Key].Color
                : getRandomPastelColor(ContentName),
            };
          }
          resultObj[Key].Owner.push(CharacterName);
          if (!isCleared) {
            resultObj[Key].Frequency++;
            resultObj[Key].ReamainOwner.push(CharacterName);
          }
        }
        if (type === "Custom") {
          if (resultObj[ContentName] === undefined) {
            resultObj[ContentName] = {
              Frequency: 0,
              GateState: [],
              ContentsName: ContentName,
              Owner: [],
              ReamainOwner: [],
              Color: getRandomPastelColor(ContentName),
            };
          }
          resultObj[ContentName].Owner.push(CharacterName);
          if (!isCleared) {
            resultObj[ContentName].Frequency++;
            resultObj[ContentName].ReamainOwner.push(CharacterName);
          }
        }
      }
    }
  }
  return resultObj;
};

export default CalculateCheckbox;
