interface commanderInfo {
  gateNumber: number;
  level: number;
  gold: number;
}
export interface IGates {
  [difficulty: string]: commanderInfo;
}
export interface IData {
  [name: string]: IGates[];
}
