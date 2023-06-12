import { ICharacterState } from "../../../atoms/atoms";
import { IAccountOrder } from "../../../atoms/order";

const reOrderAccountOreder = (
  checkBoxConfig: ICharacterState,
  prev: IAccountOrder[],

  AccountIndex: number
): IAccountOrder[] => {
  const copiedPrev: IAccountOrder[] = [...prev];
  const copiedCharacter = { ...copiedPrev[AccountIndex] };
  const copiedCharacterOrder = [...copiedCharacter.CharacterOrder];

  for (let CharacterName in checkBoxConfig) {
    const { isVisible } = checkBoxConfig[CharacterName];
    if (!isVisible) {
      const targetIndex = copiedCharacterOrder.indexOf(CharacterName);
      copiedCharacterOrder.splice(targetIndex, 1);
    }
  }
  copiedCharacter.CharacterOrder = copiedCharacterOrder;
  copiedPrev[AccountIndex] = copiedCharacter;

  return copiedPrev;
};
export default reOrderAccountOreder;
