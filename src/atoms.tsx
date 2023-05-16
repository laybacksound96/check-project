import { atom } from "recoil";

export interface ICheck {
  checkName: string;
  isChecked: boolean;
}
export interface ICharacter {
  CharacterName: string;
  Check: ICheck[];
  ServerName?: string;
  CharacterLevel?: number;
  CharacterClassName?: string;
  ItemAvgLevel?: string;
  ItemMaxLevel?: string;
}

export const CharacterState = atom<ICharacter[]>({
  key: "CharacterInfo",
  default: [
    {
      CharacterName: "a",
      Check: [
        { checkName: "A", isChecked: false },
        { checkName: "B", isChecked: false },
        { checkName: "C", isChecked: false },
        { checkName: "D", isChecked: false },
        { checkName: "E", isChecked: false },
      ],
    },
    {
      CharacterName: "b",
      Check: [
        { checkName: "A", isChecked: false },
        { checkName: "B", isChecked: false },
        { checkName: "C", isChecked: false },
        { checkName: "D", isChecked: false },
        { checkName: "E", isChecked: false },
      ],
    },
    {
      CharacterName: "c",
      Check: [
        { checkName: "A", isChecked: false },
        { checkName: "B", isChecked: false },
        { checkName: "C", isChecked: false },
        { checkName: "D", isChecked: false },
        { checkName: "E", isChecked: false },
      ],
    },
  ],
});

export const ColumnState = atom({
  key: "ColumnState",
  default: ["사과", "배", "바나나", "귤", "오렌지", "아보카도", "치킨", "짬뽕"],
});
