import { atom } from "recoil";

export interface ContentStateSetting {
  isGoldContents: boolean;
  isCleared: boolean;
  isVisible: boolean;
  isActivated: boolean;
}
export interface IContentState {
  [ContentName: string]: ContentStateSetting;
}
export interface IContentSetting {
  [CharacterName: string]: IContentState;
}
export interface IAccountContent {
  [AccountName: string]: IContentSetting;
}
export const ContentSetting = atom<IAccountContent>({
  key: "ContentSetting",
  default: {},
});
