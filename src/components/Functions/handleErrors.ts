import { IAccountOrder } from "../../atoms/data";

export const IsDisabled = (...args: boolean[]): boolean => {
  const hasTrue = args.some((value) => value === true);
  return hasTrue;
};

export const IsInValidName = (name: string): boolean => {
  const regex = /^(?!.*[ㄱ-ㅎㅏ-ㅣ])[가-힣a-zA-Z0-9]{1,12}$/;
  return !regex.test(name);
};

export const IsDuplicated = (
  inputValue: string,
  accountOrder: IAccountOrder[]
): boolean => {
  for (let i in accountOrder) {
    const foundCharacter = accountOrder[i].characters.find(
      ({ CharacterName }) => {
        return CharacterName === inputValue;
      }
    );
    if (foundCharacter) {
      return true;
    }
  }
  return false;
};
