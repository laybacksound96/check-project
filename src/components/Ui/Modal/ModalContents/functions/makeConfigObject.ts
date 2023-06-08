import { IConfigObject, IGates } from "../../../../../atoms";
import CountGates from "./CountGates";
import IsValidLevel from "./IsValidLevel";
import calculateGoldContents from "./calculateGoldContents";
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
      isGoldContents: calculateGoldContents(level).includes(content),
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
        isFixedDifficulty: Difficulty === "normal" ? true : false,
        isVisible: isActivated,
      };
      DefaultObject.Gates?.push(Gate);
    }
    return DefaultObject;
  }
  const CustomObject: IConfigObject = {
    isGoldContents: false,
    isCleared: false,
    isVisible: true,
    Gates: [],
  };

  return CustomObject;
};

export default makeConfigObject;
