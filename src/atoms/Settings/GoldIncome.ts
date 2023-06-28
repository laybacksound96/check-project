import { atom } from "recoil";
export interface IGoldIncomeContent {
  [ContentName: string]: number;
}
export interface IGoldIncomeCharacter {
  [CharacterName: string]: IGoldIncomeContent;
}
export interface IGoldIncomeAccount {
  [AccountName: string]: IGoldIncomeCharacter;
}
export const GoldIncome = atom<IGoldIncomeAccount>({
  key: "GoldIncome",
  default: {},
});
