import { atom } from "recoil";

export interface ICharacter {
  Characters: string[];
}

export const CharacterState = atom<ICharacter[]>({
  key: "CharacterInfo",
  default: [
    {
      Characters: ["a", "b", "c"],
    },
    {
      Characters: ["d", "e", "f"],
    },
    {
      Characters: ["g", "h", "i"],
    },
  ],
});

export const ColumnState = atom({
  key: "ColumnState",
  default: ["사과", "배", "바나나", "귤", "오렌지", "아보카도", "치킨"],
});
