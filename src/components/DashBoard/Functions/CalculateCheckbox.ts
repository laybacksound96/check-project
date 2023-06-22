import { IContentsFrequency } from "../../../atoms/atoms";
import { IAccountOrder, IContentsOrder } from "../../../atoms/order";

import CalculateGateDifficulty from "./CalculateGateDifficulty";
import getRandomPastelColor from "./getRandomPastelColor";

export const CalculateCheckbox = (
  AccountOrder: IAccountOrder[],
  ContentsOrder: IContentsOrder,

  Prev: IContentsFrequency
): void => {
  // const resultObj: IContentsFrequency = {};
  // for (let index in AccountOrder) {
  //   const { AccountName, CharacterOrder } = AccountOrder[index];
  //   const ContentOrder = ContentsOrder[AccountName];
  //   for (let index in ContentOrder) {
  //     const ContentName = ContentOrder[index];
  //     for (let index in CharacterOrder) {
  //       const CharacterName = CharacterOrder[index];
  //       const { Gates, isCleared, isActivated, isVisible } =
  //         CheckBoxconfig[CharacterName][ContentName];
  //       if (!isActivated || !isVisible) continue;
  //       const { type } = ContentsState[AccountName][ContentName];
  //       const resultName =
  //         type === "Default"
  //           ? `${ContentName}_${CalculateGateDifficulty(Gates).join("_")}`
  //           : ContentName;
  //       const gateState =
  //         type === "Default" ? CalculateGateDifficulty(Gates) : [];
  //       if (!resultObj[resultName]) {
  //         resultObj[resultName] = {
  //           Frequency: 0,
  //           GateState: gateState,
  //           ContentsName: ContentName,
  //           Owner: [],
  //           RemainOwner: [],
  //           Color: Prev.hasOwnProperty(resultName)
  //             ? Prev[resultName].Color
  //             : getRandomPastelColor(ContentName),
  //         };
  //       }
  //       resultObj[resultName].Owner.push(CharacterName);
  //       if (!isCleared) {
  //         resultObj[resultName].Frequency++;
  //         resultObj[resultName].RemainOwner.push(CharacterName);
  //       }
  //     }
  //   }
  // }
  // return resultObj;
};

export default CalculateCheckbox;
