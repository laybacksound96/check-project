import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { useEffect } from "react";
import Content from "./Content";
import React from "react";
import sortContentsFrequency from "../Functions/sortContentsFrequency";
import CalculateCheckbox from "../Functions/CalculateCheckbox";
import { ContentsFrequency } from "../../../atoms/frequency";
import { Gates } from "../../../atoms/Settings/Gates";
import { ContentSetting } from "../../../atoms/Settings/ContentSetting";
import { CharacterSetting } from "../../../atoms/Settings/CharacterSetting";

const ContainerStyle = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: auto;
  margin-top: 30px;
`;

const Contents = () => {
  const [contentsFrequency, setContentsFrequency] =
    useRecoilState(ContentsFrequency);
  const gates = useRecoilValue(Gates);
  const contentSetting = useRecoilValue(ContentSetting);
  const characterSetting = useRecoilValue(CharacterSetting);
  useEffect(() => {
    setContentsFrequency((prev) =>
      CalculateCheckbox(gates, contentSetting, characterSetting, prev)
    );
  }, [characterSetting, contentSetting, gates, setContentsFrequency]);

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
