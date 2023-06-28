import { atom } from "recoil";

export interface IContentState {
  isGoldContents: boolean;
  isCleared: boolean;
  isVisible: boolean;
  isActivated: boolean;
}

export interface IContentSetting {
  [AccountName: string]: {
    [CharacterName: string]: {
      [ContentName: string]: IContentState;
    };
  };
}
export const ContentSetting = atom<IContentSetting>({
  key: "ContentSetting",
  default: {},
});
