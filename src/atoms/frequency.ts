import { atom } from "recoil";

export interface IFrequency {
  remain: string[];
  count: number;
  contentId: string;
  contentIds: string[];
  contentName: string;
  color: string;
}

export const FrequencyCounter = atom<IFrequency[]>({
  key: "FrequencyCounter",
  default: [],
});
