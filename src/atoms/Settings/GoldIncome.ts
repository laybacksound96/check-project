import { atom } from "recoil";

export interface IGoldIncome {
  [AccountName: string]: {
    [CharacterName: string]: {
      [ContentName: string]: number;
    };
  };
}
export const GoldIncome = atom<IGoldIncome>({
  key: "GoldIncome",
  default: {},
});
