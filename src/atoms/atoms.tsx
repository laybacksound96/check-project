import { atom } from "recoil";

export interface IGates {
  ["Gate_No"]: number;
  ["isActivated"]: boolean;
  ["isVisible"]: boolean;
  ["isFixedDifficulty"]: boolean;
  ["Difficulty"]: string;
}
export interface ICharsContentState {
  ["isGoldContents"]: boolean;
  ["isCleared"]: boolean;
  ["isVisible"]: boolean;
  ["isActivated"]: boolean;
  ["Gates"]: IGates[];
}
export interface ICharsContentSetting {
  [ContentName: string]: ICharsContentState;
}

export interface ICharacterState {
  ["ServerName"]: string;
  ["CharacterClassName"]: string;
  ["ItemMaxLevel"]: number;
  ["IsGoldCharacter"]: boolean;
  ["isVisible"]: boolean;
  ["Contents"]: ICharsContentSetting;
}
export interface ICharacterSetting {
  [CharacterName: string]: ICharacterState;
}
export interface IContentState {
  type: "Default" | "Custom";
  isVisible: boolean;
}
export interface IContentsSetting {
  [ContentsName: string]: IContentState;
}
export interface IAccountState {
  ["ContentsSetting"]: IContentsSetting;
  ["CharacterSetting"]: ICharacterSetting;
}
export interface IUserSetting {
  [AccountName: string]: IAccountState;
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
