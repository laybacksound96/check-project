import { atom } from "recoil";

export interface IGates {
  difficulty: "normal" | "hard";
  gates: { level: number; gold: number }[];
}
export type ICommander = {
  name: string;
  data: IGates[];
};

export const CommanderData = atom<ICommander[]>({
  key: "CommanderData",
  default: [],
});
