import { atom } from "recoil";
import { fetchCheck } from "./util/fetch";

export interface ICharacter {
  Characters: string[];
}

interface IBox {
  value: boolean;
  fetch: () => void;
}
type BoxArray = IBox[][];

export const checkBoxState = atom<BoxArray>({
  key: "checkBoxState",
  default: [
    [
      { value: true, fetch: () => fetchCheck },
      { value: true, fetch: () => fetchCheck },
      { value: true, fetch: () => fetchCheck },
    ],
    [
      { value: true, fetch: () => fetchCheck },
      { value: true, fetch: () => fetchCheck },
      { value: true, fetch: () => fetchCheck },
    ],
    [
      { value: true, fetch: () => fetchCheck },
      { value: true, fetch: () => fetchCheck },
      { value: true, fetch: () => fetchCheck },
    ],
  ],
});

export const CharacterState = atom<ICharacter[]>({
  key: "CharacterInfo",
  default: [
    {
      Characters: ["a", "b", "c"],
    },
  ],
});

export const ColumnState = atom({
  key: "ColumnState",
  default: ["사과", "배", "바나나", "귤", "오렌지", "아보카도", "치킨"],
});
