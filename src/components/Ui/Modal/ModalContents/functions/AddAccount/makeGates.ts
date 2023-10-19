import { IGates } from "../../../../../../atoms/data";
import { ICommanderGates } from "../../../../../../json/CommanderData";

const makeGates = (level: number, gates: ICommanderGates[]) => {
  const result = [];
  for (let i in gates) {
    const gate: IGates = { isVisible: true, isNormal: true };
    if (gates[i][0].level > level) gate.isVisible = false;
    if (gates[i].length > 1) {
      if (gates[i][1].level <= level) {
        gate.isNormal = false;
      }
    }
    result.push(gate);
  }
  return result;
};
export default makeGates;
