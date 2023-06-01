import { atom } from "recoil";

export interface IGates {
  ["Gate_No"]: number;
  ["Difficulty"]?: "normal" | "hard" | "easy";
  ["isActivated"]: boolean;
}
export interface IConfigObject {
  ["isCleared"]: boolean;
  ["isVisible"]: boolean;
  ["Gates"]: IGates[];
}
interface IContentName {
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

export const VisibledColumns = atom<string[]>({
  key: "visibledColumns",
  default: [],
});
export const AccountOrder = atom<string[]>({
  key: "AccountOrder",
  default: [],
});

export enum ModalEnum {
  CONFIG_CONTENT = "Value 1",
  ADD_CONTENT = "Value 2",
  ADD_ACCOUNT = "Value 3",
}
type IModal = IModalObject;
interface IModalObject {
  isModalOpen: boolean;
  modalType?: ModalEnum;
}
export const ModalState = atom<IModal>({
  key: "ModalState",
  default: { isModalOpen: false },
});
