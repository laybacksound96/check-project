import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Content from "./Content";
import React from "react";
import AllChecked from "./AllChecked";
import { AccountOrder, IAccountOrder, IContent } from "../atoms/data";
import processDifficulty from "./Functions/processDifficulty";

const ContainerStyle = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(250px, 1fr));
  grid-auto-rows: auto;
  margin-top: 30px;
`;
function filterContents(accountOrder: IAccountOrder[]) {
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
function flattenArray(arr: IContent[][]) {
  return arr.reduce((flat, subArray) => {
    return flat.concat(subArray);
  }, []);
}
function countAndGroupByContentId(
  inputArray: {
    contentId: string;
    owner: string;
    contentName: string;
    contentIds: string[];
  }[]
) {
  const result: {
    remain: string[];
    count: number;
    contentId: string;
    contentIds: string[];
    contentName: string;
  }[] = [];
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
      });
    }
  }

  return result;
}
function makeContentsFrequency(filteredContents: IContent[][]): IFrequency[] {
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
    };
  });
  return countAndGroupByContentId(processed);
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
interface IFrequency {
  remain: string[];
  count: number;
  contentId: string;
  contentIds: string[];
  contentName: string;
}
const Contents = () => {
  const accountOrder = useRecoilValue(AccountOrder);
  const frequency = makeContentsFrequency(filterContents(accountOrder));

  return (
    <ContainerStyle>
      {sortCommander(frequency).map(
        ({ contentId, contentName, count, remain, contentIds }) => {
          return (
            <Content
              key={contentId + contentName}
              contentName={contentName}
              count={count}
              remain={remain}
              color={"gray"}
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
