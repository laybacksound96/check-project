import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  AccountState,
  CheckBoxConfig,
  ContentsFrequency,
  ContentsState,
} from "../../../atoms/atoms";
import { useEffect } from "react";
import Content from "./Content";
import CalculateCheckbox from "../Functions/CalculateCheckbox";
import React from "react";
import sortContentsFrequency from "../Functions/sortContentsFrequency";

const ContainerStyle = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: auto;
  margin-top: 30px;
`;

const Contents = () => {
  const [contentsFrequency, setContentsFrequency] =
    useRecoilState(ContentsFrequency);
  const checkBoxConfig = useRecoilValue(CheckBoxConfig);
  const contentsState = useRecoilValue(ContentsState);
  const accountState = useRecoilValue(AccountState);
  useEffect(() => {
    setContentsFrequency((prev) =>
      CalculateCheckbox(checkBoxConfig, contentsState, accountState, prev)
    );
  }, [checkBoxConfig, contentsState, setContentsFrequency, accountState]);
  sortContentsFrequency(contentsFrequency);

  return (
    <ContainerStyle>
      {sortContentsFrequency(contentsFrequency).map((key) => {
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
