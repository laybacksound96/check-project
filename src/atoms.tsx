import { atom } from "recoil";

interface ICheckboxState {
  isCleared: boolean;
  isVisible: boolean;
}
interface ICheckbox {
  [Content: string]: ICheckboxState;
}
export interface ICheckCharacters {
  [Character: string]: ICheckbox;
}
export type ICheckAccounts = { [accountOwner: string]: ICheckCharacters };
export const CheckboxesState = atom<ICheckAccounts>({
  key: "CheckboxesState",
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
  difficulty?: "Normal" | "Hard";
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
