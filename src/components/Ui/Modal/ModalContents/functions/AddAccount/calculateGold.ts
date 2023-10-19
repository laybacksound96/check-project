import { ICommanderData } from "../../../../../../json/CommanderData";

const calculateGold = (level: number, commanderData: ICommanderData[]) => {
  let goldContents = [];
  for (let i in commanderData) {
    let gold = 0;
    const { gates, contentName } = commanderData[i];
    for (let gateNumber in gates) {
      const gate = gates[gateNumber];
      if (gate[0].level > level) continue;
      if (gate.length === 1) {
        gold += gate[0].gold;
      } else {
        if (gate[1].level <= level) {
          gold += gate[1].gold;
        } else {
          gold += gate[0].gold;
        }
      }
    }
    goldContents.push({ contentName, gold });
  }
  return goldContents
    .sort((a, b) => b.gold - a.gold)
    .slice(0, 3)
    .map((elem) => elem.contentName);
};

export default calculateGold;
