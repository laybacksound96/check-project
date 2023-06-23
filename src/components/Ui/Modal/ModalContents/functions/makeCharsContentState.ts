import { ICharsContentState } from "../../../../../atoms/userSetting";
import IsValidLevel from "./IsValidLevel";
import makeGates from "./makeGates";

const makeCharsContentState = (
  level: number,
  content: string,
  type: string
): ICharsContentState => {
  const isDefault = type === "Default";
  const DefaultObject: ICharsContentState = {
    isCleared: false,
    isVisible: true,
    isActivated: isDefault ? IsValidLevel(content, level) : true,
    isGoldContents: false,
    Gates: isDefault ? makeGates(content, level) : [],
  };
  return DefaultObject;
};

export default makeCharsContentState;
