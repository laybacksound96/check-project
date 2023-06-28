import { atom } from "recoil";

export interface IContentState {
  type: "Default" | "Custom";
  isVisible: boolean;
}
export interface IContents {
  [AccountName: string]: {
    [ContentsName: string]: IContentState;
  };
}
export const Contents = atom<IContents>({
  key: "Contents",
  default: {},
});
