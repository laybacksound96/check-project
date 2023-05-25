import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { CheckboxesState, ICheckAccounts, ContentsState } from "../../../atoms";
import { useEffect, useState } from "react";
import Content from "./Content";

const ContainerStyle = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-auto-rows: 60px;
  gap: 10px;
  margin-top: 30px;
`;

interface IContentsState {
  [contentName: string]: number;
}
const CalculateCheckbox = (AccountsObj: ICheckAccounts) => {
  const resultObj: IContentsState = {};
  function frequencyCounter(AccountsObj: any) {
    for (let key in AccountsObj) {
      if (typeof AccountsObj[key] === "object" && AccountsObj[key] !== null) {
        frequencyCounter(AccountsObj[key]);
      } else {
        if (resultObj[key] === undefined) resultObj[key] = 0;
        if (AccountsObj[key] === false) resultObj[key]++;
      }
    }
  }
  frequencyCounter(AccountsObj);

  return resultObj;
};
const Contents = () => {
  const [contentState, setContentState] = useState<IContentsState>({});
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
