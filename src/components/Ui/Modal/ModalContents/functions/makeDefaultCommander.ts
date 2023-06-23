import { IContentsSetting } from "../../../../../atoms/userSetting";
import { IData } from "./makeActivatedAndDifficulty";
import commander from "./commander.json";

const makeDefaultCommander = (): IContentsSetting => {
  const result: IContentsSetting = {};
  const commanderData: IData = commander;

  for (let commanderName in commanderData) {
    result[`${commanderName}`] = {
      type: "Default",
      isVisible: true,
    };
  }

  return result;
};

export default makeDefaultCommander;
