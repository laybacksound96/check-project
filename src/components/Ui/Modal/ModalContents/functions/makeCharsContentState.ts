import { ICharsContentState } from "../../../../../atoms/Settings/ContentSetting";
import IsValidLevel from "./IsValidLevel";
import makeGates from "./makeGates";

const makeCharsContentState = (
  level: number,
  content: string,
  type: string,
  isGoldContents: boolean
): ICharsContentState => {
  const isDefault = type === "Default";
  const DefaultObject: ICharsContentState = {
    isCleared: false,
    isVisible: true,
    isActivated: true,
    isGoldContents: false,
    Gates: [],
  };
  if (isDefault) {
    DefaultObject.isActivated = IsValidLevel(content, level);
    DefaultObject.Gates = makeGates(content, level);
    DefaultObject.isVisible = isGoldContents;
    DefaultObject.isGoldContents = isGoldContents;
  }
  return DefaultObject;
};

export default makeCharsContentState;
