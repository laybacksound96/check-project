import { atom } from "recoil";

export interface ICharacter {
  CharacterName: string;
}

export const CharacterState = atom<ICharacter[]>({
  key: "CharacterInfo",
  default: [
    {
      CharacterName: "a",
    },
  ],
});

export const ColumnState = atom({
  key: "ColumnState",
  default: ["사과", "배", "바나나", "귤", "오렌지", "아보카도", "치킨", "짬뽕"],
});
