import CalculateGateDifficulty from "./CalculateGateDifficulty";
import getRandomPastelColor from "./getRandomPastelColor";
import { IContentsFrequency } from "../../../atoms/frequency";
import { IGates, IGatesSetting } from "../../../atoms/Settings/Gates";
import { IAccountContent } from "../../../atoms/Settings/ContentSetting";
import { ICharacterSetting } from "../../../atoms/Settings/CharacterSetting";

export function getKey(ContentName: string, gates: IGatesSetting[]): string {
  return ContentName + CalculateGateDifficulty(gates).join("_");
}
export const CalculateCheckbox = (
  GatesAtom: IGates,
  ContentSetting: IAccountContent,
  CharacterSetting: ICharacterSetting,
  prev: IContentsFrequency
): IContentsFrequency => {
  const resultObj: IContentsFrequency = {};
  for (let AccountName in ContentSetting) {
    for (let CharacterName in ContentSetting[AccountName]) {
      const { isVisible: CharacterVisible } =
        CharacterSetting[AccountName][CharacterName];
      for (let ContentName in ContentSetting[AccountName][CharacterName]) {
        const { isCleared, isVisible, isActivated } =
          ContentSetting[AccountName][CharacterName][ContentName];
        const gates = GatesAtom[AccountName][CharacterName][ContentName];
        if (!isVisible || !isActivated || !CharacterVisible) continue;
        const Key = getKey(ContentName, gates);
        const isExistKey = resultObj.hasOwnProperty(Key);
        if (!isExistKey) {
          resultObj[Key] = {
            Color: prev.hasOwnProperty(Key)
              ? prev[Key].Color
              : getRandomPastelColor(ContentName),
            ContentName,
            Frequency: 0,
            GateState: CalculateGateDifficulty(gates),
            Owner: [],
            RemainOwner: [],
          };
        } else {
          resultObj[Key].Owner.push(CharacterName);
        }
        if (!isCleared) {
          resultObj[Key].Frequency++;
          resultObj[Key].RemainOwner.push(CharacterName);
        }
      }
    }
  }

  return resultObj;
};

export default CalculateCheckbox;
