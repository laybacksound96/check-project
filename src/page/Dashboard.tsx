import { useParams } from "react-router-dom";
import CheckBox from "../components/CheckBox/CheckBox";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CheckBoxContainer, Container, HeaderBox } from "../Style/Dashboard";
import Vertical from "../components/CheckBox/Vertical/Vertical";

import Contents from "../components/Contents";

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
        <Contents />
      </HeaderBox>
      <CheckBoxContainer>
        <Vertical />
        <CheckBox />
      </CheckBoxContainer>
    </Container>
  );
}

export default Dashboard;
