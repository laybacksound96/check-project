import { ICheckBoxconfig } from "../../../atoms/atoms";

function isAllTrue(
  ContentName: string,
  CharacterOrder: string[],
  Content: ICheckBoxconfig
) {
  for (let index in CharacterOrder) {
    const CharacterName = CharacterOrder[index];
    if (Content[CharacterName][ContentName].isVisible) return true;
  }
  return false;
}
export default isAllTrue;
