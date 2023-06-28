import { IContentsSetting } from "../../../../../atoms/Settings/ContentSetting";
import commander from "./commander.json";
import { IData } from "../../../../../json/commanderTypes";

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
