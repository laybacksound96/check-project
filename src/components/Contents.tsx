import { useRecoilValue } from "recoil";
import styled, { keyframes } from "styled-components";
import { CheckboxesState, ICheckAccounts, IContentsState } from "../atoms";
import { useEffect, useState } from "react";

const ContentStyle = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-auto-rows: 60px;
  gap: 10px;
  margin-top: 30px;
`;
const bump = keyframes`
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(0.9);
  }
  30% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.10);
  }
  100% {
    transform: scale(1);}
 `;
const Content = styled.li`
  margin: 0 10px;
  text-align: center;
  border-radius: 10px;
  width: auto;
  max-width: 200px;
  min-width: 120px;
  height: 50px;
  line-height: 50px;
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.bgColor};
  animation: ${bump} 300ms ease-out;
`;
const CalculateCheckbox = (AccountsObj: ICheckAccounts) => {
  const resultObj: IContentsState = {};
  function traverseNestedObject(AccountsObj: any) {
    for (let key in AccountsObj) {
      if (typeof AccountsObj[key] === "object" && AccountsObj[key] !== null) {
        traverseNestedObject(AccountsObj[key]);
      } else {
        if (resultObj[key] === undefined) resultObj[key] = 0;
        if (AccountsObj[key] === false) resultObj[key]++;
      }
    }
  }
  traverseNestedObject(AccountsObj);
  return resultObj;
};
const Contents = () => {
  const [contentState, setContentState] = useState<IContentsState>({});
  const checkboxState = useRecoilValue(CheckboxesState);
  useEffect(() => {
    setContentState(() => CalculateCheckbox(checkboxState));
  }, [checkboxState]);

  return (
    <ContentStyle>
      {Object.keys(contentState).map((key) => (
        <div key={key}>
          <span>{key}: </span>
          <span>{contentState[key]}</span>
        </div>
      ))}
    </ContentStyle>
  );
};

export default Contents;
