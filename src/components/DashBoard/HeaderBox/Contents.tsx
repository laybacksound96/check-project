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
import React from "react";
import sortContentsFrequency from "../Functions/sortContentsFrequency";
import CalculateCheckbox from "../Functions/CalculateCheckbox";
import { AccountOrder, ContentsOrder } from "../../../atoms/order";

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
  const accountOrder = useRecoilValue(AccountOrder);
  const contentsOrder = useRecoilValue(ContentsOrder);
  useEffect(() => {
    setContentsFrequency((prev) =>
      CalculateCheckbox(
        checkBoxConfig,
        accountOrder,
        contentsOrder,
        contentsState,
        prev
      )
    );
  }, [
    checkBoxConfig,
    contentsState,
    setContentsFrequency,
    accountState,
    accountOrder,
    contentsOrder,
  ]);

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
