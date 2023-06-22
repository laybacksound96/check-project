import { IContentsFrequency, IUserSetting } from "../../../atoms/atoms";
import { IAccountOrder } from "../../../atoms/order";

import CalculateGateDifficulty from "./CalculateGateDifficulty";
import getRandomPastelColor from "./getRandomPastelColor";

export const CalculateCheckbox = (
  AccountOrder: IAccountOrder[],
  UserSetting: IUserSetting,
  Prev: IContentsFrequency
): IContentsFrequency => {
  const resultObj: IContentsFrequency = {};
  for (let index in AccountOrder) {
    const { AccountName, CharacterOrder, ContentsOrder } = AccountOrder[index];
    for (let index in ContentsOrder) {
      const ContentName = ContentsOrder[index];
      for (let index in CharacterOrder) {
        const CharacterName = CharacterOrder[index];
        const { Gates, isCleared, isActivated, isVisible } =
          UserSetting[AccountName].CharacterState[CharacterName].Contents[
            ContentName
          ];
        const { type } = UserSetting[AccountName].AllContentState[ContentName];
        const resultName =
          type === "Default"
            ? `${ContentName}_${CalculateGateDifficulty(Gates).join("_")}`
            : ContentName;
        const gateState =
          type === "Default" ? CalculateGateDifficulty(Gates) : [];
        if (!isActivated || !isVisible) continue;
        if (!resultObj[resultName]) {
          resultObj[resultName] = {
            Frequency: 0,
            GateState: gateState,
            ContentsName: ContentName,
            Owner: [],
            RemainOwner: [],
            Color: Prev.hasOwnProperty(resultName)
              ? Prev[resultName].Color
              : getRandomPastelColor(ContentName),
          };
        }
        resultObj[resultName].Owner.push(CharacterName);
        if (!isCleared) {
          resultObj[resultName].Frequency++;
          resultObj[resultName].RemainOwner.push(CharacterName);
        }
      }
    }
  }
  return resultObj;
};

export default CalculateCheckbox;
