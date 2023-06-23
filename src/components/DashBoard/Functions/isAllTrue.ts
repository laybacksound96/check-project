import { ICharacterSetting } from "../../../atoms/atoms";

function isAllTrue(
  ContentName: string,
  CharacterOrder: string[],
  Content: ICharacterSetting
) {
  for (let index in CharacterOrder) {
    const CharacterName = CharacterOrder[index];
    if (Content[CharacterName].Contents[ContentName].isVisible) return true;
  }
  return false;
}
export default isAllTrue;
