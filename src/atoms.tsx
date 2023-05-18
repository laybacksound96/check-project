import { atom } from "recoil";
import { fetchCheck } from "./util/fetch";

type IAccounts = IAccount[];

export interface IAccount {
  AccountName: string;
  Characters: ICharacter[];
}
export interface ICharacter {
  CharacterName: string;
  Contents: IBox[];
}
export interface IBox {
  ContentName: string;
  value: boolean;
  fetch: () => void;
}

export const AccountsState = atom<IAccounts>({
  key: "AccountsState",
  default: [
    {
      AccountName: "a",
      Characters: [
        {
          CharacterName: "a_1",
          Contents: [
            { ContentName: "a_1_1", value: true, fetch: () => fetchCheck },
            { ContentName: "a_1_2", value: true, fetch: () => fetchCheck },
            { ContentName: "a_1_3", value: true, fetch: () => fetchCheck },
          ],
        },
      ],
    },
  ],
});

export const ColumnState = atom({
  key: "ColumnState",
  default: ["사과", "배", "바나나", "귤", "오렌지", "아보카도", "치킨"],
});
