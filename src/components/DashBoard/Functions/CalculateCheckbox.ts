import {
  ICheckBoxconfig,
  IContentsFrequency,
  IContentsState,
} from "../../../atoms/atoms";
import { IAccountOrder, IContentsOrder } from "../../../atoms/order";

import CalculateGateDifficulty from "./CalculateGateDifficulty";
import getRandomPastelColor from "./getRandomPastelColor";

export const CalculateCheckbox = (
  CheckBoxconfig: ICheckBoxconfig,
  AccountOrder: IAccountOrder[],
  ContentsOrder: IContentsOrder,
  ContentsState: IContentsState,
  Prev: IContentsFrequency
): IContentsFrequency => {
  const resultObj: IContentsFrequency = {};
  for (let index in AccountOrder) {
    const { AccountName, CharacterOrder } = AccountOrder[index];
    const ContentOrder = ContentsOrder[AccountName];
    for (let index in ContentOrder) {
      const ContentName = ContentOrder[index];
      for (let index in CharacterOrder) {
        const CharacterName = CharacterOrder[index];
        const { Gates, isCleared, isActivated, isVisible } =
          CheckBoxconfig[CharacterName][ContentName];
        if (!isActivated || !isVisible) continue;
        const { type } = ContentsState[AccountName][ContentName];
        const resultName =
          type === "Default"
            ? `${ContentName}_${CalculateGateDifficulty(Gates).join("_")}`
            : ContentName;

        if (!resultObj[resultName]) {
          resultObj[resultName] = {
            Frequency: 0,
            GateState: CalculateGateDifficulty(Gates),
            ContentsName: ContentName,
            Owner: [],
            ReamainOwner: [],
            Color: Prev.hasOwnProperty(resultName)
              ? Prev[resultName].Color
              : getRandomPastelColor(ContentName),
          };
        }
        resultObj[resultName].Owner.push(CharacterName);
        if (!isCleared) {
          resultObj[resultName].Frequency++;
          resultObj[resultName].ReamainOwner.push(CharacterName);
        }
      }
    }
  }
  return resultObj;
};

export default CalculateCheckbox;
