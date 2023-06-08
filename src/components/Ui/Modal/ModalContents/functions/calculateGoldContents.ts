import commander from "./commander.json";
import { IData } from "./makeActivatedAndDifficulty";

const calculateGoldContents = (userLevel: number): string[] => {
  const commanderData: IData = commander;
  const gold: { [commander: string]: number } = {};
  for (let index in Object.keys(commanderData)) {
    const name = Object.keys(commanderData)[index];
    gold[`${name}`] = 0;

    for (let gateIndex in commanderData[name]) {
      const gate = commanderData[name][gateIndex];
      if (gate.hasOwnProperty("hard")) {
        if (userLevel >= gate["hard"].level) {
          gold[`${name}`] += gate["hard"].gold;
          continue;
        }
      }
      if (userLevel >= gate["normal"].level)
        gold[`${name}`] += gate["normal"].gold;
    }
  }
  const entries = Object.entries(gold);
  const sortedEntries = entries.sort((a, b) => b[1] - a[1]);

  const top3Keys = sortedEntries.slice(0, 3).map((entry) => entry[0]);

  return top3Keys;
};

export default calculateGoldContents;
