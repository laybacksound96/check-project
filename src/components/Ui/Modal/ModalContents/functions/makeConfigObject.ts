import { IConfigObject, IGates } from "../../../../../atoms";
import CountGates from "./CountGates";
import IsValidLevel from "./IsValidLevel";
import makeActivatedAndDifficulty from "./makeActivatedAndDifficulty";

const makeConfigObject = (
  level: number,
  content: string,
  type: string
): IConfigObject => {
  if (type === "Default") {
    const gateCount = CountGates(content);
    const DefaultObject: IConfigObject = {
      isCleared: false,
      isVisible: IsValidLevel(content, level),
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
    return DefaultObject;
  }
  const CustomObject: IConfigObject = {
    isCleared: false,
    isVisible: true,
  };

  return CustomObject;
};

export default makeConfigObject;
