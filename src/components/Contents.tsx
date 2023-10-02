import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Content from "./Content";
import React from "react";
import AllChecked from "./AllChecked";
import { FrequencyCounter } from "../atoms/frequency";

const ContainerStyle = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(250px, 1fr));
  grid-auto-rows: auto;
  margin-top: 30px;
`;

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
