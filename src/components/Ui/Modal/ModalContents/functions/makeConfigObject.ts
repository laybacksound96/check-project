import { IConfigObject, IContentName, IGates } from "../../../../../atoms";
import CountGates from "./CountGates";
import makeActivatedAndDifficulty from "./makeActivatedAndDifficulty";

const makeConfigObject = (
  level: number,
  content: string,
  type: string
): IContentName => {
  if (type === "Default") {
    const gateCount = CountGates(content);
    const DefaultObject: IConfigObject = {
      isCleared: false,
      isVisible: true,
      Gates: [],
    };
    for (let gateNumber = 1; gateNumber < gateCount + 1; gateNumber++) {
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
      DefaultObject.Gates?.push(Gate);
    }
    return { [`${content}`]: DefaultObject };
  }
  const CustomObject: IConfigObject = {
    isCleared: false,
    isVisible: true,
  };
  const ContentName: IContentName = { [`${content}`]: CustomObject };
  return ContentName;
};

export default makeConfigObject;
