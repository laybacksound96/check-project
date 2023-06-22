import { atom } from "recoil";

export interface IGates {
  ["Gate_No"]: number;
  ["isActivated"]: boolean;
  ["isVisible"]: boolean;
  ["isFixedDifficulty"]: boolean;
  ["Difficulty"]: string;
}
export interface IConfigObject {
  ["isGoldContents"]: boolean;
  ["isCleared"]: boolean;
  ["isVisible"]: boolean;
  ["isActivated"]: boolean;
  ["Gates"]: IGates[];
}
export interface IContentName {
  [ContentName: string]: IConfigObject;
}

interface ICharacterSettings {
  ["ServerName"]: string;
  ["CharacterClassName"]: string;
  ["ItemMaxLevel"]: number;
  ["IsGoldCharacter"]: boolean;
  ["isVisible"]: boolean;
  ["Contents"]: IContentName;
}
export interface ICharacterState {
  [Character: string]: ICharacterSettings;
}
export interface IContentState {
  type: "Default" | "Custom";
  isVisible: boolean;
}
export interface IAllContents {
  [ContentsName: string]: IContentState;
}
export interface IAccountState {
  ["AllContentState"]: IAllContents;
  ["CharacterState"]: ICharacterState;
}
export interface IUserSetting {
  [Account: string]: IAccountState;
}
export const UserSetting = atom<IUserSetting>({
  key: "UserSetting",
  default: {},
});

export interface IFrequencyContents {
  [`ContentsName`]: string;
  [`GateState`]: string[];
  [`Frequency`]: number;
  [`Owner`]: string[];
  [`RemainOwner`]: string[];
  [`Color`]: string;
}

export interface IContentsFrequency {
  [contentKey: string]: IFrequencyContents;
}

export const ContentsFrequency = atom<IContentsFrequency>({
  key: "IContentsFrequency",
  default: {},
});
