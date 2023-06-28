import { atom } from "recoil";

export interface IGatesSetting {
  isActivated: boolean;
  isVisible: boolean;
  Difficulty: "normal" | "hard";
}
export interface IGates {
  [AccountName: string]: {
    [CharacterName: string]: {
      [ContentName: string]: IGatesSetting[];
    };
  };
}
export const Gates = atom<IGates>({
  key: "Gates",
  default: {},
});
