import { IFetchedCharacter } from "../AddAccount";

const SortByLevel = (data: IFetchedCharacter[]) => {
  const copiedData: IFetchedCharacter[] = [...data];
  copiedData.sort((a, b) => {
    const itemAvgLevelA = parseFloat(a.ItemAvgLevel.replace(",", ""));
    const itemAvgLevelB = parseFloat(b.ItemAvgLevel.replace(",", ""));

    if (itemAvgLevelA > itemAvgLevelB) {
      return -1; // a를 b보다 앞으로 정렬
    } else if (itemAvgLevelA < itemAvgLevelB) {
      return 1; // b를 a보다 앞으로 정렬
    } else {
      return 0; // 정렬 순서 변경 없음
    }
  });
  return copiedData;
};
export default SortByLevel;
