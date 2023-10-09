import { ICharacters } from "../../atoms/data";

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
  characters: ICharacters[]
): boolean => {
  for (let i in characters) {
    const foundCharacter = characters[i].characters.find(
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
