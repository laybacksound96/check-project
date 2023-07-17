import {
  ContentStateSetting,
  IAccountContent,
  IContentSetting,
  IContentState,
} from "../../../atoms/Settings/ContentSetting";

const makeUnchecked = (setting: IAccountContent): IAccountContent | null => {
  const allAccount = Object.keys(setting);
  if (!allAccount) return null;
  const copiedObject: IAccountContent = { ...setting };
  for (let AccountName in copiedObject) {
    const copiedCharacters: IContentSetting = { ...copiedObject[AccountName] };
    for (let CharacterName in copiedCharacters) {
      const copiedContents: IContentState = {
        ...copiedCharacters[CharacterName],
      };
      for (let ContentName in copiedContents) {
        const copiedSetting: ContentStateSetting = {
          ...copiedContents[ContentName],
          isCleared: false,
        };
        copiedContents[ContentName] = copiedSetting;
      }
      copiedCharacters[CharacterName] = copiedContents;
    }
    copiedObject[AccountName] = copiedCharacters;
  }

  return copiedObject;
};
export default makeUnchecked;
