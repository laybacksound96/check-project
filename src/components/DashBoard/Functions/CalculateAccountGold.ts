import { ICharacterSetting } from "../../../atoms/Settings/CharacterSetting";
import { IAccountContent } from "../../../atoms/Settings/ContentSetting";
import { IGates } from "../../../atoms/Settings/Gates";
import commander from "../../../json/commander.json";
import { IData } from "../../../json/commanderTypes";

const CalculateAccountGold = (
  characterSetting: ICharacterSetting,
  contentSetting: IAccountContent,
  gates: IGates,
  isTotal: boolean
) => {
  const commanderData: IData = commander;

  let result = 0;
  for (let AccountName in characterSetting) {
    for (let CharacterName in characterSetting[AccountName]) {
      const { isVisible } = characterSetting[AccountName][CharacterName];
      if (!isVisible) continue;
      for (let ContentName in contentSetting[AccountName][CharacterName]) {
        const { isActivated, isCleared, isVisible } =
          contentSetting[AccountName][CharacterName][ContentName];
        if (!isActivated || !isVisible) continue;

        if (!isTotal) {
          if (!isCleared) continue;
        }
        const gate = gates[AccountName][CharacterName][ContentName];
        for (let index in gate) {
          const { isVisible, isActivated, Difficulty } = gate[index];
          const gold = commanderData[ContentName][index][Difficulty]?.gold;
          if (!isVisible || !isActivated || !gold) continue;
          result += gold;
        }
      }
    }
  }
  return result;
};
export default CalculateAccountGold;
