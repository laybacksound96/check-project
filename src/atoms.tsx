import { atom } from "recoil";

interface ICheckbox {
  [Content: string]: boolean;
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
  default: {
    aa: {
      aa2: {
        ServerName: "asds",
        CharacterClassName: "sfaswg",
        ItemMaxLevel: 43,
      },
      aa3: {
        ServerName: "asds",
        CharacterClassName: "sfaswg",
        ItemMaxLevel: 43,
      },
      aa25: {
        ServerName: "asds",
        CharacterClassName: "sfaswg",
        ItemMaxLevel: 43,
      },
    },
    aa2: {
      bb2: {
        ServerName: "fwasds",
        CharacterClassName: "sfaswg",
        ItemMaxLevel: 433,
      },
      bb3: {
        ServerName: "fwasds",
        CharacterClassName: "sfaswg",
        ItemMaxLevel: 433,
      },
      bb4: {
        ServerName: "fwasds",
        CharacterClassName: "sfaswg",
        ItemMaxLevel: 433,
      },
    },
  },
});

interface IContentState {
  type: "Default" | "Custom";
  isVisible: boolean;
}
export interface IContents {
  [ContentsName: string]: IContentState;
}
export const ContentsState = atom<IContents>({
  key: "ContentsState",
  default: {
    A: { type: "Default", isVisible: true },
    B: { type: "Default", isVisible: true },
    C: { type: "Default", isVisible: true },
    D: { type: "Default", isVisible: true },
    E: { type: "Default", isVisible: false },
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
