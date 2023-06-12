import { atom } from "recoil";
import makeDefaultCommander from "../components/Ui/Modal/ModalContents/functions/makeDefaultCommander";

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
  ["isVisible"]: boolean;
}
export interface ICharacterState {
  [Character: string]: ICharacterInfo;
}

export const AccountState = atom<ICharacterState>({
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
  default: makeDefaultCommander(),
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