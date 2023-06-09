import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  CheckBoxConfig,
  ContentsFrequency,
  ContentsState,
} from "../../../atoms/atoms";
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
  const [contentsFrequency, setContentsFrequency] =
    useRecoilState(ContentsFrequency);
  const checkBoxConfig = useRecoilValue(CheckBoxConfig);
  const Contents = useRecoilValue(ContentsState);

  useEffect(() => {
    setContentsFrequency((prev) =>
      CalculateCheckbox(checkBoxConfig, Contents, prev)
    );
  }, [checkBoxConfig, Contents, setContentsFrequency]);

  return (
    <ContainerStyle>
      {Object.keys(contentsFrequency).map((key) => {
        if (!contentsFrequency[key]) return null;
        if (contentsFrequency[key].Frequency === 0) return null;
        return (
          <Content
            key={key}
            contentState={contentsFrequency[key]}
            Color={contentsFrequency[key].Color}
          />
        );
      })}
    </ContainerStyle>
  );
};

export default React.memo(Contents);
