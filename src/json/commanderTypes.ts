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

export type ICommanderData = {
  name: string;
  difficulty: "normal" | "hard";
  gates: { level: number; gold: number }[];
};

export const commanderData: ICommanderData[] = [
  {
    name: "아르고스",
    difficulty: "normal",
    gates: [{ level: 1385, gold: 1000 }],
  },
  {
    name: "발탄",
    difficulty: "normal",
    gates: [
      { level: 1415, gold: 500 },
      { level: 1415, gold: 700 },
    ],
  },
  {
    name: "발탄",
    difficulty: "hard",
    gates: [
      { level: 1445, gold: 700 },
      { level: 1445, gold: 1100 },
    ],
  },
  {
    name: "비아키스",
    difficulty: "normal",
    gates: [
      { level: 1430, gold: 600 },
      { level: 1430, gold: 1000 },
    ],
  },
  {
    name: "비아키스",
    difficulty: "hard",
    gates: [
      { level: 1460, gold: 900 },
      { level: 1460, gold: 1500 },
    ],
  },
  {
    name: "쿠크세이튼",
    difficulty: "normal",
    gates: [
      { level: 1475, gold: 600 },
      { level: 1475, gold: 900 },
      { level: 1475, gold: 1500 },
    ],
  },
  {
    name: "아브렐슈드",
    difficulty: "normal",
    gates: [
      { level: 1490, gold: 1500 },
      { level: 1490, gold: 1500 },
      { level: 1500, gold: 1500 },
      { level: 1500, gold: 2500 },
    ],
  },
  {
    name: "아브렐슈드",
    difficulty: "hard",
    gates: [
      { level: 1540, gold: 2000 },
      { level: 1540, gold: 2000 },
      { level: 1550, gold: 2000 },
      { level: 1550, gold: 3000 },
    ],
  },
  {
    name: "카양겔",
    difficulty: "normal",
    gates: [
      { level: 1540, gold: 1000 },
      { level: 1540, gold: 1500 },
      { level: 1540, gold: 3000 },
    ],
  },
  {
    name: "카양겔",
    difficulty: "hard",
    gates: [
      { level: 1580, gold: 1500 },
      { level: 1580, gold: 2500 },
      { level: 1580, gold: 4000 },
    ],
  },
  {
    name: "일리아칸",
    difficulty: "normal",
    gates: [
      { level: 1580, gold: 1500 },
      { level: 1580, gold: 2000 },
      { level: 1580, gold: 4500 },
    ],
  },
  {
    name: "일리아칸",
    difficulty: "hard",
    gates: [
      { level: 1600, gold: 1750 },
      { level: 1600, gold: 2500 },
      { level: 1600, gold: 5750 },
    ],
  },
  {
    name: "상아탑",
    difficulty: "normal",
    gates: [
      { level: 1600, gold: 1500 },
      { level: 1600, gold: 1750 },
      { level: 1600, gold: 2500 },
      { level: 1600, gold: 3250 },
    ],
  },
  {
    name: "상아탑",
    difficulty: "hard",
    gates: [
      { level: 1620, gold: 2000 },
      { level: 1620, gold: 2500 },
      { level: 1620, gold: 4000 },
      { level: 1620, gold: 6000 },
    ],
  },
  {
    name: "카멘",
    difficulty: "normal",
    gates: [
      { level: 1610, gold: 3500 },
      { level: 1610, gold: 4500 },
      { level: 1610, gold: 5500 },
    ],
  },
  {
    name: "카멘",
    difficulty: "hard",
    gates: [
      { level: 1630, gold: 5000 },
      { level: 1630, gold: 6000 },
      { level: 1630, gold: 9000 },
      { level: 1630, gold: 21000 },
    ],
  },
];
