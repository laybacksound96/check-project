interface commanderInfo {
  difficulty: "normal" | "hard";
  level: number;
  gold: number;
}
export type ICommanderGates = commanderInfo[];

export interface ICommanderData {
  contentName: string;
  gates: ICommanderGates[];
}

export const CommanderData: ICommanderData[] = [
  {
    contentName: "아르고스",
    gates: [[{ difficulty: "normal", level: 1385, gold: 1000 }]],
  },
  {
    contentName: "발탄",
    gates: [
      [
        { difficulty: "normal", level: 1415, gold: 500 },
        { difficulty: "hard", level: 1445, gold: 700 },
      ],
      [
        { difficulty: "normal", level: 1415, gold: 700 },
        { difficulty: "hard", level: 1445, gold: 1100 },
      ],
    ],
  },

  {
    contentName: "비아키스",
    gates: [
      [
        { difficulty: "normal", level: 1430, gold: 400 },
        { difficulty: "hard", level: 1460, gold: 600 },
      ],
      [
        { difficulty: "normal", level: 1430, gold: 500 },
        { difficulty: "hard", level: 1460, gold: 700 },
      ],
      [
        { difficulty: "normal", level: 1430, gold: 700 },
        { difficulty: "hard", level: 1460, gold: 1100 },
      ],
    ],
  },
  {
    contentName: "쿠크세이튼",
    gates: [
      [{ difficulty: "normal", level: 1475, gold: 600 }],
      [{ difficulty: "normal", level: 1475, gold: 900 }],
      [{ difficulty: "normal", level: 1475, gold: 1500 }],
    ],
  },
  {
    contentName: "아브렐슈드",
    gates: [
      [
        { difficulty: "normal", level: 1490, gold: 1200 },
        { difficulty: "hard", level: 1540, gold: 2500 },
      ],
      [
        { difficulty: "normal", level: 1490, gold: 1800 },
        { difficulty: "hard", level: 1540, gold: 3000 },
      ],
      [
        { difficulty: "normal", level: 1500, gold: 700 },
        { difficulty: "hard", level: 1550, gold: 900 },
      ],
      [
        { difficulty: "normal", level: 1500, gold: 800 },
        { difficulty: "hard", level: 1550, gold: 1100 },
      ],
      [
        { difficulty: "normal", level: 1520, gold: 1000 },
        { difficulty: "hard", level: 1560, gold: 1200 },
      ],
      [
        { difficulty: "normal", level: 1520, gold: 1500 },
        { difficulty: "hard", level: 1560, gold: 1800 },
      ],
    ],
  },
  {
    contentName: "일리아칸",
    gates: [
      [
        { difficulty: "normal", level: 1580, gold: 1500 },
        { difficulty: "hard", level: 1600, gold: 1750 },
      ],
      [
        { difficulty: "normal", level: 1580, gold: 2000 },
        { difficulty: "hard", level: 1600, gold: 2500 },
      ],
      [
        { difficulty: "normal", level: 1580, gold: 3000 },
        { difficulty: "hard", level: 1600, gold: 5750 },
      ],
    ],
  },
  {
    contentName: "카양겔",
    gates: [
      [
        { difficulty: "normal", level: 1540, gold: 800 },
        { difficulty: "hard", level: 1580, gold: 1000 },
      ],
      [
        { difficulty: "normal", level: 1540, gold: 800 },
        { difficulty: "hard", level: 1580, gold: 1000 },
      ],
      [
        { difficulty: "normal", level: 1540, gold: 1200 },
        { difficulty: "hard", level: 1580, gold: 1500 },
      ],
      [
        { difficulty: "normal", level: 1540, gold: 1700 },
        { difficulty: "hard", level: 1580, gold: 2000 },
      ],
    ],
  },
  {
    contentName: "상아탑",
    gates: [
      [
        { difficulty: "normal", level: 1600, gold: 1500 },
        { difficulty: "hard", level: 1620, gold: 2000 },
      ],
      [
        { difficulty: "normal", level: 1600, gold: 1750 },
        { difficulty: "hard", level: 1620, gold: 2500 },
      ],
      [
        { difficulty: "normal", level: 1600, gold: 2500 },
        { difficulty: "hard", level: 1620, gold: 4000 },
      ],
      [
        { difficulty: "normal", level: 1600, gold: 3250 },
        { difficulty: "hard", level: 1620, gold: 6000 },
      ],
    ],
  },
];
