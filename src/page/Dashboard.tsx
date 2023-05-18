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
import { useState } from "react";
import Content from "../components/Content";

interface RouteParams {
  userId: string;
}

export interface IContent {
  name: string;
  quantity: number;
}

const mocking = {
  name: "사과",
  quantity: 2,
};

function Dashboard(props: any) {
  const { userId } = useParams<RouteParams>();
  const [content] = useState<IContent>(mocking);
  return (
    <Container>
      <HeaderBox>
        <header>
          <h1>{userId}님의 Sheet</h1>
          <FontAwesomeIcon icon={faGear} size="lg" />
        </header>
        <hr></hr>
        <Contents>
          <Content content={content} />
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
