import { useParams } from "react-router-dom";
import CheckBox from "../components/CheckBox/CheckBox";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AddBtn,
  CheckBoxContainer,
  Container,
  HeaderBox,
  Items,
} from "../Style/Dashboard";
import Vertical from "../components/CheckBox/Vertical/Vertical";

interface RouteParams {
  userId: string;
}

function Dashboard(props: any) {
  const { userId } = useParams<RouteParams>();

  return (
    <Container>
      <HeaderBox>
        <header>
          <h1>{userId}님의 Sheet</h1>
          <FontAwesomeIcon icon={faGear} size="lg" />
        </header>
        <hr></hr>
        <Items>
          <li>사과 x 5</li>
          <li>배 x 6</li>
          <li>바나나 x 2</li>
          <li>귤 x 6</li>
          <li>오렌지 x 5</li>
          <li>아보카도 x 6</li>
          <li>치킨 x 5</li>
          <li>짬뽕 x 6</li>
        </Items>
      </HeaderBox>
      <CheckBoxContainer>
        <Vertical />
        <CheckBox />
      </CheckBoxContainer>
      <AddBtn />
    </Container>
  );
}

export default Dashboard;
