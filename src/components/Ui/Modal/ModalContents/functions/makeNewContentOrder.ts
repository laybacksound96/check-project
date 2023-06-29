import { IContentSetting } from "../../../../../atoms/Settings/ContentSetting";

const makeNewContentOrder = (
  characterOrder: string[],
  contentSetting: IContentSetting,
  accountName: string
): string[] => {
  const result: string[] = [];
  const contensArray = Object.keys(contentSetting[accountName]);
  for (let i in contensArray) {
    const ContentName = contensArray[i];
    for (let i in characterOrder) {
      const CharacterName = characterOrder[i];
      const { isVisible } = contentSetting[CharacterName][ContentName];
      if (result.includes(ContentName)) continue;
      if (isVisible) result.push(ContentName);
    }
  }

  return result;
};
export default makeNewContentOrder;
