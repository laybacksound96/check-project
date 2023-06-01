import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { CheckboxesState, ContentsState } from "../../../atoms";
import { useEffect, useState } from "react";
import Content from "./Content";
import CalculateCheckbox from "../Functions/CalculateCheckbox";

const ContainerStyle = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-auto-rows: 60px;
  gap: 10px;
  margin-top: 30px;
`;

export interface IContentsFrequency {
  [contentName: string]: number;
}

const Contents = () => {
  const [contentState, setContentState] = useState<IContentsFrequency>({});
  const checkboxState = useRecoilValue(CheckboxesState);
  const Contents = useRecoilValue(ContentsState);

  useEffect(() => {
    setContentState(() => CalculateCheckbox(checkboxState));
  }, [checkboxState]);

  return (
    <ContainerStyle>
      {Object.keys(Contents).map((key) => {
        if (!Contents[key].isVisible || !contentState[key]) return null;
        return (
          <Content key={key} content={key} frequency={contentState[key]} />
        );
      })}
    </ContainerStyle>
  );
};

export default Contents;
