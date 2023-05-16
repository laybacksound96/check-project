import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CheckBox from "../components/CheckBox/CheckBox";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface RouteParams {
  userId: string;
}
const Container = styled.div`
  width: 900px;
  height: 1000px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin-top: 150px;
  header {
    width: inherit;
  }
`;
const HeaderBox = styled.div`
  margin-top: 30px;
  width: inherit;
  height: auto;
  border-radius: 30px;
  padding: 30px;
  background-color: ${(props) => props.theme.subColor};
  * {
    color: ${(props) => props.theme.bgColor};
  }
  h1 {
    font-size: 30px;
  }
  header {
    width: 100%;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
  }
  svg {
    margin-top: 5px;
  }
`;
const Items = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-auto-rows: 60px;
  gap: 10px;
  margin-top: 30px;
  li {
    margin: 0 10px;
    text-align: center;
    border-radius: 10px;
    width: auto;
    min-width: 120px;
    height: 50px;
    line-height: 50px;
    background-color: ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.bgColor};
  }
`;
const AddBtn = styled.div``;

const CheckBoxContainer = styled.div`
  background-color: ${(props) => props.theme.subColor};
  * {
    color: ${(props) => props.theme.bgColor};
    font-size: 25px;
  }
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  height: auto;
  width: inherit;
  padding: 30px 40px;
  border-radius: 15px;
`;
function Dashboard(props: any) {
  const charArr = useState();
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
        <CheckBox />
        <CheckBox />
        <CheckBox />
      </CheckBoxContainer>
      <AddBtn />
    </Container>
  );
}

export default Dashboard;
