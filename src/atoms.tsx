import { atom } from "recoil";

type IAccounts = IAccount[];
type ICheckboxes = ICheckbox[][];

export interface ICheckbox {
  isChecked: boolean;
}

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

export const CheckboxesState = atom<ICheckboxes>({
  key: "CheckboxesState",
  default: [
    [{ isChecked: true }, { isChecked: false }, { isChecked: false }],
    [{ isChecked: false }, { isChecked: true }, { isChecked: false }],
    [{ isChecked: false }, { isChecked: true }, { isChecked: false }],
  ],
});

export const ColumnState = atom({
  key: "ColumnState",
  default: ["사과", "배", "C"],
});
