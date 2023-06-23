import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { ContentsFrequency, UserSetting } from "../../../atoms/userSetting";
import { useEffect } from "react";
import Content from "./Content";
import React from "react";
import sortContentsFrequency from "../Functions/sortContentsFrequency";
import CalculateCheckbox from "../Functions/CalculateCheckbox";
import { AccountOrder } from "../../../atoms/order";

const ContainerStyle = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: auto;
  margin-top: 30px;
`;

const Contents = () => {
  const [contentsFrequency, setContentsFrequency] =
    useRecoilState(ContentsFrequency);
  const accountOrder = useRecoilValue(AccountOrder);
  const userSetting = useRecoilValue(UserSetting);
  useEffect(() => {
    setContentsFrequency((prev) =>
      CalculateCheckbox(accountOrder, userSetting, prev)
    );
  }, [accountOrder, setContentsFrequency, userSetting]);

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
