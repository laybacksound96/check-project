import { IContentsFrequency } from "../../../atoms";

const getColorInFrequencyCounter = (
  obj: IContentsFrequency,
  contentsName: string,
  ownerName: string
): string => {
  for (var key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    const Contents = obj[key];
    if (Contents.ContentsName === contentsName) {
      if (Contents.ContentsOwner.includes(ownerName)) {
        const result = Contents.Color;
        return result;
      }
    }
  }
  return "";
};

export default getColorInFrequencyCounter;
