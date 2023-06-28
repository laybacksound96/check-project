import { ICharacterInfo } from "../../../../../atoms/Info/CharacterInfo";

const IsDupplicated = (
  inputName: string,
  CharacterInfo: ICharacterInfo
): boolean => {
  for (let accountName in CharacterInfo) {
    const characters = CharacterInfo[accountName];
    if (inputName in characters) return true;
  }
  return false;
};

export default IsDupplicated;
