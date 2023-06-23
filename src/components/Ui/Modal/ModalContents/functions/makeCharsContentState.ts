import { ICharsContentState, IGates } from "../../../../../atoms/userSetting";
import CountGates from "./CountGates";
import IsValidLevel from "./IsValidLevel";
import makeActivatedAndDifficulty from "./makeActivatedAndDifficulty";

const makeCharsContentState = (
  level: number,
  content: string,
  type: string
): ICharsContentState => {
  if (type === "Default") {
    const gateCount = CountGates(content);
    const DefaultObject: ICharsContentState = {
      isCleared: false,
      isVisible: true,
      isActivated: IsValidLevel(content, level),
      isGoldContents: false,
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
  const CustomObject: ICharsContentState = {
    isGoldContents: false,
    isCleared: false,
    isVisible: true,
    isActivated: true,
    Gates: [],
  };

  return CustomObject;
};

export default makeCharsContentState;
