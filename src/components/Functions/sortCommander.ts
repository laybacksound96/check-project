import { IContent } from "../../atoms/data";

function sortByCommander(contents: IContent[]) {
  const sortOrder = [
    "카멘",
    "상아탑",
    "일리아칸",
    "아브렐슈드",
    "카양겔",
    "쿠크세이튼",
    "비아키스",
    "발탄",
    "아르고스",
  ];

  return contents.sort((a, b) => {
    const indexA = sortOrder.indexOf(a.contentName);
    const indexB = sortOrder.indexOf(b.contentName);

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });
}
export default sortByCommander;
