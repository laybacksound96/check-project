import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Content from "./Content";
import React from "react";
import AllChecked from "./AllChecked";
import { IAccountOrder, IContent } from "../atoms/data";
import processDifficulty from "./Functions/processDifficulty";
import calculateStrength from "./Functions/calculateStrength";
import getRandomPastelColor from "./Functions/getRandomPastelColor";
import { FrequencyCounter, IFrequency } from "../atoms/frequency";

const ContainerStyle = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(250px, 1fr));
  grid-auto-rows: auto;
  margin-top: 30px;
`;
export function filterContents(accountOrder: IAccountOrder[]) {
  const filteredContetns = accountOrder.map(
    ({ contents, characterOrder, contentsOrder, checks }) => {
      return contents.filter(({ contentName, isVisble, owner }) => {
        return (
          contentsOrder.includes(contentName) &&
          characterOrder.includes(owner) &&
          isVisble === true &&
          checks.find(
            ({ characterName: char, contentName: cont }) =>
              char === owner && cont === contentName
          )
        );
      });
    }
  );
  return filteredContetns;
}
export function flattenArray(arr: IContent[][]) {
  return arr.reduce((flat, subArray) => {
    return flat.concat(subArray);
  }, []);
}
export function countAndGroupByContentId(
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
    const currentItem = inputArray[i];
    const existingItem = result.find(
      (item) =>
        item.contentId === currentItem.contentId &&
        item.contentName === currentItem.contentName
    );
    if (existingItem) {
      existingItem.remain.push(currentItem.owner);
      existingItem.count++;
    } else {
      result.push({
        contentName: currentItem.contentName,
        remain: [currentItem.owner],
        count: 1,
        contentId: currentItem.contentId,
        contentIds: currentItem.contentIds,
        color: currentItem.color,
      });
    }
  }

  return result;
}
export function makeContentsFrequency(filteredContents: IContent[][]) {
  const flatten = flattenArray(filteredContents);
  const processed = flatten.map(({ contentName, gateSetting, owner }) => {
    const gates = processDifficulty(
      gateSetting.map(({ difficulty }) => difficulty)
    );

    return {
      owner,
      contentName,
      contentIds: gates,
      contentId: gates && gates.join(", "),
      color: getRandomPastelColor(
        contentName,
        calculateStrength(gateSetting.map(({ difficulty }) => difficulty))
      ),
    };
  });
  return countAndGroupByContentId(processed);
}

export function sortCommander(frequency: IFrequency[]) {
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
const Contents = () => {
  const frequency = useRecoilValue(FrequencyCounter);
  return (
    <ContainerStyle>
      {frequency.map(
        ({ contentId, contentName, count, remain, contentIds, color }) => {
          return (
            <Content
              key={contentId + contentName}
              contentName={contentName}
              count={count}
              remain={remain}
              color={color}
              contentIds={contentIds}
            />
          );
        }
      )}
      {frequency.length === 0 && <AllChecked />}
    </ContainerStyle>
  );
};

export default React.memo(Contents);
