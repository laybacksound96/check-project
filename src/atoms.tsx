import { atom } from "recoil";

type IAccounts = IAccount[];

export interface IAccount {
  AccountName: string;
  Characters: ICharacter[];
}
export interface ICharacter {
  CharacterName: string;
}

export const AccountsState = atom<IAccounts>({
  key: "AccountsState",
  default: [],
});

interface ICheckbox {
  [Content: string]: boolean;
}
interface ICheckCharacters {
  [Character: string]: ICheckbox;
}
type ICheckAccounts = { [accountName: string]: ICheckCharacters };

export const CheckboxesState = atom<ICheckAccounts>({
  key: "CheckboxesState",
  default: {},
});

export type IContentsState = { [name: string]: number };

export const ContentsState = atom<IContentsState>({
  key: "ContentsState",
  default: {},
});

export const ColumnState = atom({
  key: "ColumnState",
  default: ["A", "B", "C", "D", "E"],
});

type ModalStateType = ModalContent;
interface ModalContent {
  status: boolean;
  content: { name: string };
}
export const ModalState = atom<ModalStateType>({
  key: "ModalState",
  default: { status: false, content: { name: "" } },
});
