import { useParams } from "react-router-dom";
import CheckBox from "../components/CheckBox/CheckBox";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CheckBoxContainer,
  Container,
  Contents,
  HeaderBox,
} from "../Style/Dashboard";
import Vertical from "../components/CheckBox/Vertical/Vertical";
import { useRecoilValue } from "recoil";
import { ContentsState } from "../atoms";

interface RouteParams {
  userId: string;
}

function Dashboard(props: any) {
  const { userId } = useParams<RouteParams>();
  const ContentsValue = useRecoilValue(ContentsState);
  console.log(Object.keys(ContentsValue));
  return (
    <Container>
      <HeaderBox>
        <header>
          <h1>{userId}님의 Sheet</h1>
          <div>{Object.keys(ContentsValue)}</div>
          <FontAwesomeIcon icon={faGear} size="lg" />
        </header>
        <hr></hr>
        <Contents>{Object.keys(ContentsValue)}</Contents>
      </HeaderBox>
      <CheckBoxContainer>
        <Vertical />
        <CheckBox />
      </CheckBoxContainer>
    </Container>
  );
}

export default Dashboard;
