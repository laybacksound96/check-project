import { atom } from "recoil";

export interface IDifficulty {
  difficulty: "normal" | "hard";
  gates: { level: number; gold: number }[];
}
export type ICommander = {
  name: string;
  data: IDifficulty[];
};

export const CommanderData = atom<ICommander[]>({
  key: "CommanderData",
  default: [],
});
