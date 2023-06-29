import { IContentsFrequency } from "../../../atoms/frequency";

const getColorInFrequencyCounter = (
  obj: IContentsFrequency,
  contentName: string,
  ownerName: string
): string => {
  for (var key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    const Contents = obj[key];
    if (Contents.ContentName === contentName) {
      if (Contents.Owner.includes(ownerName)) {
        const result = Contents.Color;
        return result;
      }
    }
  }
  return "";
};

export default getColorInFrequencyCounter;
