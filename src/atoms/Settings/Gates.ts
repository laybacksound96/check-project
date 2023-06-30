import { atom } from "recoil";

export interface IGatesSetting {
  ["Gate_No"]: number;
  ["isActivated"]: boolean;
  ["isVisible"]: boolean;
  ["Difficulty"]: "normal" | "hard";
  ["isNormal"]: boolean;
}
export interface IGatesContent {
  [ContentName: string]: IGatesSetting[];
}
export interface IGatesCharacter {
  [CharacterName: string]: IGatesContent;
}
export interface IGates {
  [AccountName: string]: IGatesCharacter;
}
export const Gates = atom<IGates>({
  key: "Gates",
  default: {},
});
