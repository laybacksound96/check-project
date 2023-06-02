import { IConfigObject, IContentName, IGates } from "../../../../../atoms";
import CountGates from "./CountGates";
import makeActivatedAndDifficulty from "./makeActivatedAndDifficulty";

const makeConfigObject = (
  level: number,
  content: string,
  type: string
): IContentName => {
  const ConfigObject: IConfigObject = {
    isCleared: false,
    isVisible: true,
  };
  if (type === "default") {
    const gateCount = CountGates(content);
    for (let gateNumber = 1; gateNumber > gateCount; gateNumber++) {
      const { isActivated, Difficulty } = makeActivatedAndDifficulty(
        level,
        content,
        gateNumber
      );
      const Gate: IGates = {
        Gate_No: gateNumber,
        isActivated,
        Difficulty,
      };
      ConfigObject.Gates?.push(Gate);
    }
  }
  const ContentName: IContentName = { [`${content}`]: ConfigObject };
  return ContentName;
};

export default makeConfigObject;
