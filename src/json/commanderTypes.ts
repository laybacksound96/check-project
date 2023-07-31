interface commanderInfo {
  gateNumber: number;
  level: number;
  gold: number;
}
export interface ICommanderGates {
  hard?: commanderInfo;
  normal: commanderInfo;
}

export interface ICommanderData {
  [name: string]: ICommanderGates[];
}

export const CommanderData: ICommanderData = {
  아르고스: [
    {
      normal: {
        gateNumber: 1,
        level: 1385,
        gold: 1000,
      },
    },
  ],
  발탄: [
    {
      normal: {
        gateNumber: 1,
        level: 1415,
        gold: 500,
      },
      hard: {
        gateNumber: 1,
        level: 1445,
        gold: 700,
      },
    },
    {
      normal: {
        gateNumber: 2,
        level: 1415,
        gold: 700,
      },
      hard: {
        gateNumber: 2,
        level: 1445,
        gold: 1100,
      },
    },
  ],
  비아키스: [
    {
      normal: {
        gateNumber: 1,
        level: 1430,
        gold: 400,
      },
      hard: {
        gateNumber: 1,
        level: 1460,
        gold: 600,
      },
    },
    {
      normal: {
        gateNumber: 2,
        level: 1430,
        gold: 500,
      },
      hard: {
        gateNumber: 2,
        level: 1460,
        gold: 700,
      },
    },
    {
      normal: {
        gateNumber: 3,
        level: 1430,
        gold: 700,
      },
      hard: {
        gateNumber: 3,
        level: 1460,
        gold: 1100,
      },
    },
  ],
  쿠크세이튼: [
    {
      normal: {
        gateNumber: 1,
        level: 1475,
        gold: 600,
      },
    },
    {
      normal: {
        gateNumber: 2,
        level: 1475,
        gold: 900,
      },
    },
    {
      normal: {
        gateNumber: 3,
        level: 1475,
        gold: 1500,
      },
    },
  ],
  아브렐슈드: [
    {
      normal: {
        gateNumber: 1,
        level: 1490,
        gold: 1200,
      },
      hard: {
        gateNumber: 1,
        level: 1540,
        gold: 2500,
      },
    },
    {
      normal: {
        gateNumber: 2,
        level: 1490,
        gold: 1800,
      },
      hard: {
        gateNumber: 2,
        level: 1540,
        gold: 3000,
      },
    },
    {
      normal: {
        gateNumber: 3,
        level: 1500,
        gold: 700,
      },
      hard: {
        gateNumber: 3,
        level: 1550,
        gold: 900,
      },
    },
    {
      normal: {
        gateNumber: 4,
        level: 1500,
        gold: 800,
      },
      hard: {
        gateNumber: 4,
        level: 1550,
        gold: 1100,
      },
    },
    {
      normal: {
        gateNumber: 5,
        level: 1520,
        gold: 1000,
      },
      hard: {
        gateNumber: 5,
        level: 1560,
        gold: 1200,
      },
    },
    {
      normal: {
        gateNumber: 6,
        level: 1520,
        gold: 1500,
      },
      hard: {
        gateNumber: 6,
        level: 1560,
        gold: 1800,
      },
    },
  ],
  카양겔: [
    {
      normal: {
        gateNumber: 1,
        level: 1540,
        gold: 800,
      },
      hard: {
        gateNumber: 1,
        level: 1580,
        gold: 1000,
      },
    },
    {
      normal: {
        gateNumber: 2,
        level: 1540,
        gold: 800,
      },
      hard: {
        gateNumber: 2,
        level: 1580,
        gold: 1000,
      },
    },
    {
      normal: {
        gateNumber: 3,
        level: 1540,
        gold: 1200,
      },
      hard: {
        gateNumber: 3,
        level: 1580,
        gold: 1500,
      },
    },
    {
      normal: {
        gateNumber: 4,
        level: 1540,
        gold: 1700,
      },
      hard: {
        gateNumber: 4,
        level: 1580,
        gold: 2000,
      },
    },
  ],
  일리아칸: [
    {
      normal: {
        gateNumber: 1,
        level: 1580,
        gold: 1500,
      },
      hard: {
        gateNumber: 1,
        level: 1600,
        gold: 1750,
      },
    },
    {
      normal: {
        gateNumber: 2,
        level: 1580,
        gold: 2000,
      },
      hard: {
        gateNumber: 2,
        level: 1600,
        gold: 2500,
      },
    },
    {
      normal: {
        gateNumber: 3,
        level: 1580,
        gold: 3000,
      },
      hard: {
        gateNumber: 3,
        level: 1600,
        gold: 5750,
      },
    },
  ],
  상아탑: [
    {
      normal: {
        gateNumber: 1,
        level: 1600,
        gold: 1500,
      },
      hard: {
        gateNumber: 1,
        level: 1620,
        gold: 2000,
      },
    },
    {
      normal: {
        gateNumber: 2,
        level: 1600,
        gold: 1750,
      },
      hard: {
        gateNumber: 2,
        level: 1620,
        gold: 2500,
      },
    },
    {
      normal: {
        gateNumber: 3,
        level: 1600,
        gold: 2500,
      },
      hard: {
        gateNumber: 3,
        level: 1620,
        gold: 4000,
      },
    },
    {
      normal: {
        gateNumber: 4,
        level: 1600,
        gold: 3250,
      },
      hard: {
        gateNumber: 4,
        level: 1620,
        gold: 6000,
      },
    },
  ],
};
