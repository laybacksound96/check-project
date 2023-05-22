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
  default: [
    {
      AccountName: "abbb",
      Characters: [
        {
          CharacterName: "a_1",
        },
        {
          CharacterName: "a_2",
        },
        {
          CharacterName: "a_3",
        },
      ],
    },
  ],
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
  default: {
    abbb: {
      a_1: { A: false, B: false, C: false },
      a_2: { A: false, B: false, C: false },
      a_3: { A: false, B: false, C: false },
    },
    sdad: {
      sdad_1: { A: false, B: false, C: false },
      sdad_2: { A: false, B: false, C: false },
      sdad_3: { A: false, B: false, C: false },
    },
  },
});

type IContentsState = IContent[];

export interface IContent {
  name: string;
  frequency: number;
}
export const ContentsState = atom<IContentsState>({
  key: "ContentsState",
  default: [
    { name: "A", frequency: 0 },
    { name: "B", frequency: 0 },
    { name: "C", frequency: 0 },
  ],
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
