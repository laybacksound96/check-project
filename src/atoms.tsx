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
      AccountName: "abbb",
      Characters: [
        {
          CharacterName: "a_1",
          Contents: [
            { ContentName: "a_1_1", value: true, fetch: () => fetchCheck },
            { ContentName: "a_1_2", value: true, fetch: () => fetchCheck },
            { ContentName: "a_1_3", value: true, fetch: () => fetchCheck },
          ],
        },
        {
          CharacterName: "a_2",
          Contents: [
            { ContentName: "a_2_1", value: true, fetch: () => fetchCheck },
            { ContentName: "a_2_2", value: true, fetch: () => fetchCheck },
            { ContentName: "a_2_3", value: true, fetch: () => fetchCheck },
          ],
        },
        {
          CharacterName: "a_3",
          Contents: [
            { ContentName: "a_3_1", value: true, fetch: () => fetchCheck },
            { ContentName: "a_3_2", value: true, fetch: () => fetchCheck },
            { ContentName: "a_3_3", value: true, fetch: () => fetchCheck },
          ],
        },
      ],
    },
    {
      AccountName: "b",
      Characters: [
        {
          CharacterName: "b_1",
          Contents: [
            { ContentName: "b_1_1", value: true, fetch: () => fetchCheck },
            { ContentName: "b_1_2", value: true, fetch: () => fetchCheck },
            { ContentName: "b_1_3", value: true, fetch: () => fetchCheck },
          ],
        },
        {
          CharacterName: "b_2",
          Contents: [
            { ContentName: "b_2_1", value: true, fetch: () => fetchCheck },
            { ContentName: "b_2_2", value: true, fetch: () => fetchCheck },
            { ContentName: "b_2_3", value: true, fetch: () => fetchCheck },
          ],
        },
        {
          CharacterName: "b_3",
          Contents: [
            { ContentName: "b_3_1", value: true, fetch: () => fetchCheck },
            { ContentName: "b_3_2", value: true, fetch: () => fetchCheck },
            { ContentName: "b_3_3", value: true, fetch: () => fetchCheck },
          ],
        },
      ],
    },
  ],
});

export const ColumnState = atom({
  key: "ColumnState",
  default: ["사과", "배", "C", "D", "E", "F", "H"],
});
