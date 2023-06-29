import CalculateGateDifficulty from "./CalculateGateDifficulty";
import getRandomPastelColor from "./getRandomPastelColor";
import { IContentsFrequency } from "../../../atoms/frequency";
import {
  ICharacterOrders,
  IContentsOrders,
} from "../../../atoms/Settings/Orders";
// CalculateGateDifficulty(Gates).join("_")
// getRandomPastelColor(ContentName)
export const CalculateCheckbox = (
  CharacterOrder: ICharacterOrders,
  ContentsOrder: IContentsOrders,
  AccountOrder: string[],
  Prev: IContentsFrequency
): IContentsFrequency => {
  const resultObj: IContentsFrequency = {};
  for (let index in AccountOrder) {
    const AccountName = AccountOrder[index];
    for (let index in ContentsOrder[AccountName]) {
      const ContentName = ContentsOrder[index];
      for (let index in CharacterOrder[AccountName]) {
        const CharacterName = CharacterOrder[index];
      }
    }
  }
  return resultObj;
};

export default CalculateCheckbox;
