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
  ["Gates"]: IGates[];
}
export interface IContentName {
  [ContentName: string]: IConfigObject;
}
export interface ICheckBoxconfig {
  [ChracterName: string]: IContentName;
}
export const CheckBoxConfig = atom<ICheckBoxconfig>({
  key: "CheckBoxConfig",
  default: {},
});

interface ICharacterInfo {
  ["ServerName"]: string;
  ["CharacterClassName"]: string;
  ["ItemMaxLevel"]: number;
  ["IsGoldCharacter"]: boolean;
  ["GoldContents"]: string[];
}
export interface ICharacterState {
  [Character: string]: ICharacterInfo;
}
export type IAccountState = { [accountOwner: string]: ICharacterState };
export const AccountState = atom<IAccountState>({
  key: "AccountState",
  default: {},
});

export interface IContentState {
  type: "Default" | "Custom";
  isVisible: boolean;
}
export interface IContents {
  [ContentsName: string]: IContentState;
}
export const ContentsState = atom<IContents>({
  key: "ContentsState",
  default: {
    발탄: { type: "Default", isVisible: true },
    비아키스: { type: "Default", isVisible: true },
    쿠크세이튼: { type: "Default", isVisible: true },
    아브렐슈드: { type: "Default", isVisible: true },
  },
});

export interface IFrequencyContents {
  [`ContentsName`]: string;
  [`GateState`]: string[];
  [`Frequency`]: number;
  [`ContentsOwner`]: string[];
  [`Color`]: string;
}
export interface IContentsFrequency {
  [contentKey: string]: IFrequencyContents;
}

export const ContentsFrequency = atom<IContentsFrequency>({
  key: "IContentsFrequency",
  default: {},
});

export interface Contents {
  ["name"]: string;
  ["width"]: number;
}
export const VisibledColumns = atom<Contents[]>({
  key: "visibledColumns",
  default: [],
});
export const AccountOrder = atom<string[]>({
  key: "AccountOrder",
  default: [],
});
