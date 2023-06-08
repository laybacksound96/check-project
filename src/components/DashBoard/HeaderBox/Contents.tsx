import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  CheckBoxConfig,
  ContentsFrequency,
  ContentsState,
} from "../../../atoms";
import { useEffect } from "react";
import Content from "./Content";
import CalculateCheckbox from "../Functions/CalculateCheckbox";
import React from "react";

const ContainerStyle = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  grid-auto-rows: auto;
  gap: 10px;
  margin-top: 30px;
`;

const Contents = () => {
  const [contentState, setContentState] = useRecoilState(ContentsFrequency);
  const checkBoxConfig = useRecoilValue(CheckBoxConfig);
  const Contents = useRecoilValue(ContentsState);

  useEffect(() => {
    setContentState((prev) =>
      CalculateCheckbox(checkBoxConfig, Contents, prev)
    );
  }, [checkBoxConfig, Contents, setContentState]);

  return (
    <ContainerStyle>
      {Object.keys(contentState).map((key) => {
        if (!contentState[key]) return null;
        if (contentState[key].Frequency === 0) return null;
        return (
          <Content
            key={key}
            contentState={contentState[key]}
            Color={contentState[key].Color}
          />
        );
      })}
    </ContainerStyle>
  );
};

export default React.memo(Contents);
