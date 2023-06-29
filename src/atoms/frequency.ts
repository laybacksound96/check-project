import { atom } from "recoil";

export interface IFrequencyContents {
  [`ContentName`]: string;
  [`GateState`]: string[];
  [`Frequency`]: number;
  [`Owner`]: string[];
  [`RemainOwner`]: string[];
  [`Color`]: string;
}

export interface IContentsFrequency {
  [contentKey: string]: IFrequencyContents;
}

export const ContentsFrequency = atom<IContentsFrequency>({
  key: "IContentsFrequency",
  default: {},
});
