import { ICharacterState } from "../../../atoms/atoms";
import { IAccountOrder } from "../../../atoms/order";

const reOrderAccountOreder = (
  AccountState: ICharacterState,
  prev: IAccountOrder[],
  AccountIndex: number
): IAccountOrder[] => {
  const copiedPrev: IAccountOrder[] = [...prev];
  const copiedCharacter = { ...copiedPrev[AccountIndex] };
  const copiedCharacterOrder = [...copiedCharacter.CharacterOrder];

  const newArray = copiedCharacterOrder.filter(
    (name) => AccountState[`${name}`].isVisible
  );

  copiedCharacter.CharacterOrder = newArray;
  copiedPrev[AccountIndex] = copiedCharacter;

  return copiedPrev;
};
export default reOrderAccountOreder;
