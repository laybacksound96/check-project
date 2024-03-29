import { IAccount, ICheck, IContent, IContents } from "../../atoms/data";
import { IFrequency } from "../../atoms/frequency";
import getRandomPastelColor from "./getRandomPastelColor";
import processDifficulty from "./processDifficulty";

export function filterContents(
  characterOrder: string[],
  contents: IContent[],
  contentsOrder: string[],
  checks: ICheck[]
) {
  return contents.filter(({ contentName, isVisble, owner, isGoldContents }) => {
    const isChecked = check(checks, owner, contentName);
    return (
      contentsOrder.includes(contentName) &&
      characterOrder.includes(owner) &&
      isVisble === true &&
      isChecked === false
    );
  });
}

export function flattenArray(arr: IContent[][]) {
  return arr.reduce((flat, subArray) => {
    return flat.concat(subArray);
  }, []);
}
const check = (checks: ICheck[], char: string, cont: string) => {
  const check = checks.find(({ characterName, contentName }) => {
    return characterName === char && cont === contentName;
  });
  if (!check) {
    return false;
  } else {
    return true;
  }
};
export function countFrequency(
  inputArray: {
    contentId: string;
    owner: string;
    contentName: string;
    contentIds: string[];
    color: string;
  }[]
): IFrequency[] {
  const result: IFrequency[] = [];
  for (let i = 0; i < inputArray.length; i++) {
    const {
      contentName,
      owner: characterName,
      contentId,
      contentIds,
      color,
    } = inputArray[i];

    const existingItem = result.find(
      (item) => item.contentId === contentId && item.contentName === contentName
    );
    if (!existingItem) {
      result.push({
        contentName: contentName,
        remain: [characterName],
        count: 1,
        contentId: contentId,
        contentIds: contentIds,
        color: color,
      });
    } else {
      existingItem.remain.push(characterName);
      existingItem.count++;
    }
  }
  return result;
}
export function makeContentsFrequency(filteredContents: IContent[]) {
  const processed = filteredContents.map(
    ({ contentName, gateSetting, owner }) => {
      const gates = processDifficulty(gateSetting);
      return {
        owner,
        contentName,
        contentIds: gates,
        contentId: gates && gates.join(", "),
        color: getRandomPastelColor(contentName, gateSetting),
      };
    }
  );
  return processed;
}

function sortCommander(frequency: IFrequency[]) {
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

  return frequency.sort((a, b) => {
    const indexA = sortOrder.indexOf(a.contentName);
    const indexB = sortOrder.indexOf(b.contentName);

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });
}

export function makeFrequencyCounter(
  accounts: IAccount[],
  contents: IContents[]
): IFrequency[] {
  const result: IContent[][] = [];
  for (let i in accounts) {
    const { _id, checks, characterOrder, contentsOrder } = accounts[i];
    const content = contents.find(({ owner }) => owner === _id);
    if (!content) continue;

    const filteredConents = filterContents(
      characterOrder,
      content.contents,
      contentsOrder,
      checks
    );
    result.push(filteredConents);
  }
  const flattenContents = flattenArray(result);
  const contentsFrequency = makeContentsFrequency(flattenContents);
  const countedFrequency = countFrequency(contentsFrequency);
  const sortedFrequency = sortCommander(countedFrequency);
  return sortedFrequency;
}
