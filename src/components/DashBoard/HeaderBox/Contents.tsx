import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { CheckBoxConfig, ContentsState } from "../../../atoms";
import { useEffect, useState } from "react";
import Content from "./Content";
import CalculateCheckbox from "../Functions/CalculateCheckbox";

const ContainerStyle = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-auto-rows: auto;
  gap: 10px;
  margin-top: 30px;
`;

export interface IContents {
  [`ContentsName`]: string;
  [`GateState`]: string[];
  [`Frequency`]: number;
  [`ContentsOwner`]: string[];
}
export interface IContentsFrequency {
  [contentKey: string]: IContents;
}

const Contents = () => {
  const [contentState, setContentState] = useState<IContentsFrequency>({});
  const checkBoxConfig = useRecoilValue(CheckBoxConfig);
  const Contents = useRecoilValue(ContentsState);

  useEffect(() => {
    setContentState(() => CalculateCheckbox(checkBoxConfig, Contents));
  }, [checkBoxConfig, Contents]);

  return (
    <ContainerStyle>
      {Object.keys(contentState).map((key) => {
        if (!contentState[key]) return null;
        return <Content key={key} contentState={contentState[key]} />;
      })}
    </ContainerStyle>
  );
};

export default Contents;
