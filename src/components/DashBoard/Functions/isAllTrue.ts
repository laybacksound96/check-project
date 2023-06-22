import { ICharacterState } from "../../../atoms/atoms";

function isAllTrue(
  ContentName: string,
  CharacterOrder: string[],
  Content: ICharacterState
) {
  for (let index in CharacterOrder) {
    const CharacterName = CharacterOrder[index];
    if (Content[CharacterName].Contents[ContentName].isVisible) return true;
  }
  return false;
}
export default isAllTrue;
