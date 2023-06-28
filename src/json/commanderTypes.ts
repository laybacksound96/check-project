interface commanderInfo {
  gateNumber: number;
  level: number;
  gold: number;
}
export interface IGates {
  hard?: commanderInfo;
  normal: commanderInfo;
}
export interface IData {
  [name: string]: IGates[];
}
