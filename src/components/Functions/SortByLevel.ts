import { IFetchedCharacter } from "../ModalAddAccount";

const SortByLevel = (data: IFetchedCharacter[]) => {
  const copiedData: IFetchedCharacter[] = [...data];
  copiedData.sort((a, b) => {
    const itemAvgLevelA = parseFloat(a.ItemAvgLevel.replace(",", ""));
    const itemAvgLevelB = parseFloat(b.ItemAvgLevel.replace(",", ""));

    if (itemAvgLevelA > itemAvgLevelB) {
      return -1;
    } else if (itemAvgLevelA < itemAvgLevelB) {
      return 1;
    } else {
      return 0;
    }
  });
  return copiedData;
};
export default SortByLevel;
