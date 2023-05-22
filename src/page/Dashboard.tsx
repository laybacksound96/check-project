import { useParams } from "react-router-dom";
import CheckBox from "../components/CheckBox/CheckBox";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CheckBoxContainer,
  Container,
  HeaderBox,
  Contents,
} from "../Style/Dashboard";
import Vertical from "../components/CheckBox/Vertical/Vertical";

import Content from "../components/Content";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  AccountsState,
  CheckboxesState,
  ColumnState,
  ContentsState,
} from "../atoms";
import { useEffect } from "react";

interface RouteParams {
  userId: string;
}

function Dashboard(props: any) {
  const { userId } = useParams<RouteParams>();

  const accounts = useRecoilValue(AccountsState);

  const contents = useRecoilValue(ContentsState);
  const columns = useRecoilValue(ColumnState);
  useEffect(() => {}, [accounts, columns]);
  return (
    <Container>
      <HeaderBox>
        <header>
          <h1>{userId}님의 Sheet</h1>
          <FontAwesomeIcon icon={faGear} size="lg" />
        </header>
        <hr></hr>
        <Contents>
          {contents.map((content) => {
            return (
              <Content
                content={content}
                key={content.name + "_" + content.frequency}
              />
            );
          })}
        </Contents>
      </HeaderBox>
      <CheckBoxContainer>
        <Vertical />
        <CheckBox />
      </CheckBoxContainer>
    </Container>
  );
}

export default Dashboard;
