import commander from "./commander.json";
import { IData } from "./commanderTypes";

const CountGates = (contentName: string) => {
  const commanderData: IData = commander;
  return commanderData[contentName].length;
};

export default CountGates;
