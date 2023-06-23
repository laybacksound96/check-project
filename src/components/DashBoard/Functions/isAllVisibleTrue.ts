import { ICharacterSetting } from "../../../atoms/userSetting";

const isAllVisibleTrue = (
  ContentName: string,
  CharacterOrder: string[],
  CharacterSetting: ICharacterSetting
): boolean => {
  for (let index in CharacterOrder) {
    const CharacterName = CharacterOrder[index];
    const { isVisible } =
      CharacterSetting[`${CharacterName}`].Contents[`${ContentName}`];
    if (isVisible) return true;
  }
  return false;
};
export default isAllVisibleTrue;
