import commander from "./commander.json";
import { IData } from "./makeActivatedAndDifficulty";

const calculateGoldContents = (userLevel: number): string[] => {
  const commanderData: IData = commander;
  const GoldContents: { [commander: string]: number } = {};
  for (let index in Object.keys(commanderData)) {
    const commanderName = Object.keys(commanderData)[index];
    GoldContents[`${commanderName}`] = 0;

    for (let gateIndex in commanderData[commanderName]) {
      const gate = commanderData[commanderName][gateIndex];
      if (gate.hasOwnProperty("hard")) {
        if (userLevel >= gate["hard"].level) {
          GoldContents[`${commanderName}`] += gate["hard"].gold;
          continue;
        }
      }
      if (userLevel >= gate["normal"].level)
        GoldContents[`${commanderName}`] += gate["normal"].gold;
    }
  }

  const entries = Object.entries(GoldContents);
  const sortedEntries = entries.sort((a, b) => b[1] - a[1]);
  const top3Keys = sortedEntries.slice(0, 3).map((entry) => entry[0]);

  return top3Keys;
};

export default calculateGoldContents;
