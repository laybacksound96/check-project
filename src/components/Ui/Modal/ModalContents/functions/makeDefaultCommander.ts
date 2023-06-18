import { IContents } from "../../../../../atoms/atoms";
import { IData } from "./makeActivatedAndDifficulty";
import commander from "./commander.json";
import { dragIcon } from "../../../../../Settings";
const makeDefaultCommander = () => {
  const result: IContents = {};
  const commanderData: IData = commander;

  for (let commanderName in commanderData) {
    result[`${commanderName}`] = {
      type: "Default",
      isVisible: true,
      width: dragIcon.icon.edgeLength,
    };
  }

  return result;
};

export default makeDefaultCommander;
