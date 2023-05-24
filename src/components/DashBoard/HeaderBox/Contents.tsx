import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  CheckboxesState,
  ColumnState,
  ICheckAccounts,
  IContentsState,
} from "../../../atoms";
import { useEffect, useState } from "react";
import Content from "./Content";

const ContainerStyle = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-auto-rows: 60px;
  gap: 10px;
  margin-top: 30px;
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
  const column = useRecoilValue(ColumnState);
  console.log(contentState);
  console.log(column);
  useEffect(() => {
    setContentState(() => CalculateCheckbox(checkboxState));
  }, [checkboxState]);

  return (
    <ContainerStyle>
      {column.map((key) => {
        if (!key.isVisible || !contentState[key.contentName]) return null;
        return (
          <Content
            key={key.contentName}
            content={key.contentName}
            frequency={contentState[key.contentName]}
          />
        );
      })}
    </ContainerStyle>
  );
};

export default Contents;
